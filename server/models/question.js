const { mongoose } = require('../database/mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionSchema = new mongoose.Schema({
    // _id: ObjectId,
    tags: [String],
    questionTitle: String,
    questionContent: String,
    askedByUser: { type: ObjectId, ref: 'User' },
    questionVotes: Number,
    answers: [{
        // _id: ObjectId,
        answer: String,
        answeredByUser: { type: ObjectId, ref: 'User' },
        isCorrectAnswer: Boolean,
        answerVotes: Number
    }],
    createdAt: Date
});

//find all questions
questionSchema.statics.getPopularQuestions = function (req, res) {
    const Question = this;

    Question.find({}, null, { skip: 0, limit: 20, sort: { questionVotes: -1 } }, (err, doc) => {
        if (err) {
            console.log('Unable to get popular questions ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

questionSchema.statics.getRecentQuestions = function (req, res) {
    const Question = this;

    //sort: {field: -1} => descending order
    Question.find({}, null, { skip: 0, limit: 20, sort: { createdAt: -1 } }, (err, doc) => {
        if (err) {
            console.log('Unable to get recent questions ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

questionSchema.statics.getRelatedQuestions = function (req, res) {
    const Question = this;
    //tags in header converted to string => need to split
    // const tags = req.header('tags').split(',');
    const tags = req.query.tags;
    console.log('related query ', tags);

    Question.find({ tags: { $in: tags } }, null, { skip: 0, limit: 10 }, (err, doc) => {
        if (err) {
            console.log('Unable to find related questions ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}


//find question by ID
questionSchema.statics.findQuestionById = function (req, res) {
    const questionId = req.params.id;

    // console.log('question id ', req.query.id);
    const Question = this;

    // Question.findById({ _id: new ObjectId(questionId) }, (err, doc) => {
    Question.findById({ _id: questionId }, (err, doc) => {
        if (err) {
            console.log('Unable to find questions by ID ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

questionSchema.statics.getFeaturedQuestions = function (req, res) {
    const Question = this;

    //db.collection.aggregate( [ { <stage> }, ... ] )
    Question.aggregate(
        [
            {
                '$project': {
                    'tags': 1,
                    'questionTitle': 1,
                    'questionContent': 1,
                    'askedByUser': 1,
                    'questionVotes': 1,
                    'answers': 1,
                    'createdAt': 1,
                    'length': { '$size': '$answers' }
                }
            },
            { '$sort': { 'length': -1 } },
            { '$limit': 10 }
        ], (err, doc) => {
            if (err) {
                console.log('Unable to get featured questions ', err);
            } else {
                res.status(200).json(doc);
            }
        }
    );
}

//get all tags
questionSchema.statics.getTags = function (req, res) {
    const Question = this;
    let tags = [];

    Question.find({}, 'question tags', (err, docs) => {
        docs.forEach(allTags => {
            tags.push(...allTags.tags);
        });

        //Remove duplicates
        res.json([...new Set([...tags])]);
    });
}

questionSchema.statics.getUnansweredQuestions = function (req, res) {
    const Question = this;

    Question.find({ answers: { $size: 0 } }, (err, doc) => {
        if (err) {
            console.log('Unable to find unanswered questions ', err);
        } else {
            res.status(200).json(doc);
        }
    })
}

//find questions by user(name)
questionSchema.statics.findQuestionsByUser = function (req, res) {
    const userId = req.query.userId;
    const Question = this;
    console.log('userId ', userId);

    Question.find({ askedByUser: userId }, (err, doc) => {
        if (err) {
            console.log('Unable to fetch data ', err);
        } else {
            console.log('result: ', doc);
            res.status(200).json(doc);
        }
    });
}

//find questions by tag
questionSchema.statics.findQuestionsByTag = function (req, res) {
    const tag = req.query.tag;
    console.log('tag ', tag);

    const Question = this;

    Question.find({ tags: tag }, (err, doc) => {
        if (err) {
            console.log('Unable to get questions by tag ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}


//create question
questionSchema.statics.createQuestion = function (req, res) {
    const Question = this;

    Question.create(req.body, (err, doc) => {
        if (err) {
            console.log('Unable to create question ', err);
        } else {
            console.log('successfully create question: ', doc);
            res.status(200).json(doc);
        }
    });

}

//upvote, downvote question
questionSchema.statics.voteQuestion = function (req, res) {
    const questionId = req.body.questionId;
    let newVotes = 0;
    if (req.body.upvote) {
        newVotes = 1;
    } else {
        newVotes = -1;
    }

    const Question = this;

    Question.findOneAndUpdate(
        { _id: questionId },
        // increase the questionVotes by newVotes
        { $inc: { questionVotes: newVotes } },
        (err, doc) => {
            if (err) {
                console.log('Unable to update question votes ', err);
            } else {
                res.json('question-voted');
            }
        });
}


//edit question
questionSchema.statics.editQuestion = function (req, res) {
    const questionId = req.body.questionId;
    const newQuestion = req.body.newQuestion;
    const Question = this;

    Question.findOneAndUpdate(
        {
            //filter
            _id: questionId
        }, {
            //update
            $set: { questionContent: newQuestion }
        }, {
            //option
            returnOriginal: false
        }, (err, doc) => {
            if (err) {
                console.log('Unable to edit question ', err);
            } else {
                res.status(200).json('question-updated');
            }
        });
}

//delete question
questionSchema.statics.deleteQuestion = function (req, res) {
    const questionId = req.body.questionId;
    const Question = this;

    Question.findOneAndDelete({ _id: questionId }, (err, doc) => {
        if (err) {
            console.log('Unable to delete question ', err);
        } else {
            res.json('question-deleted');
            // User.deleteUserQuestion(req.user._id, questionId);
        }
    });
}

//Find answers by user with model method
questionSchema.statics.findAnswersByUser = function (req, res) {
    const userId = req.query.userId;
    const Question = this;

    console.log('userId ', userId);

    Question.find({ 'answers.answeredByUser': userId }, (err, doc) => {
        if (err) {
            console.log('Unable to find answers by user ', err);
        } else {
            console.log('result: ', doc);
            res.json(doc);
        }
    });

}

//add answer
questionSchema.statics.addAnswer = function (req, res) {
    const questionId = req.body.questionId;
    const newAnswer = req.body.newAnswer;
    const Question = this;

    Question.updateOne(
        { _id: questionId },
        //Push answer to answers array
        { $push: { answers: newAnswer } },
        (err, doc) => {
            if (err) {
                console.log('Unable to add answer ', err);
            } else {
                res.json('answer-added');
                // User.addUserAnswer(req.user._id, questionId);
            }
        }
    );

}

//edit answer
questionSchema.statics.editAnswer = function (req, res) {
    const questionId = req.body.questionId;
    const answerId = req.body.answerId;
    const newAnswer = req.body.newAnswer;
    const Question = this;

    Question.updateOne(
        { _id: questionId },
        { $set: { 'answers.$[element].answer': newAnswer } },
        //Filter answers array to update
        { arrayFilters: [{ 'element._id': answerId }] },
        (err, doc) => {
            if (err) {
                console.log('Unable to edit answer ', err);
            } else {
                console.log(doc);
                res.json('answer-edited');
            }
        });
}

//update correct answer
questionSchema.statics.updateCorrectAnswer = function (req, res) {
    const questionId = req.body.questionId;
    const correctAnswerId = req.body.correctAnswerId;
    const undo = req.body.undo;
    const Question = this;

    Question.updateOne(
        { _id: questionId, 'answers.isCorrectAnswer': true },
        { $set: { 'answers.$.isCorrectAnswer': false } },
        (err, doc) => {
            if (err) {
                console.log('Unable to update correct answer ', err);
            } else {
                if (undo){
                    res.json('correct-answer-updated');
                } else {
                    Question.updateOne(
                        { _id: questionId, 'answers._id': correctAnswerId },
                        { $set: { 'answers.$.isCorrectAnswer': true } },
                        (err, doc) => {
                            if (err) {
                                console.log('Unable to update correct answer ', err);
                            } else {
                                res.json('correct-answer-updated');
                            }
                        }
                    );
                }
            }
        }
    )

}

//upvote, downvote answer
questionSchema.statics.voteAnswer = function (req, res) {
    const questionId = req.body.questionId;
    const answerId = req.body.answerId;
    let newVotes = 0;

    if (req.body.upvote) {
        newVotes = 1;
    } else {
        newVotes = -1;
    }

    const Question = this;

    Question.findOneAndUpdate(
        { _id: questionId },
        // increase the answerVotes by newVotes
        { $inc: { 'answers.$[element].answerVotes': newVotes } },
        { arrayFilters: [{ 'element._id': answerId }] },
        (err, doc) => {
            if (err) {
                console.log('Unable to update answer votes ', err);
            } else {
                res.json('answer-voted');
            }
        });
}

//delete answer
questionSchema.statics.deleteAnswer = function (req, res) {
    const questionId = req.body.questionId;
    const answerId = req.body.answerId;
    const Question = this;

    Question.updateOne(
        { _id: questionId },
        { $pull: { answers: { _id: answerId } } },
        (err, doc) => {
            if (err) {
                console.log('Unable to delete answer ', err);
            } else {
                res.json('answer-deleted');
                console.log(doc);
                // User.deleteUserAnswer(req.user._id, questionId);
            }
        }
    )
}

const Question = mongoose.model('Question', questionSchema);

module.exports = { Question };
