const { mongoose } = require('../database/mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const { User } = require('../models/user');

const questionSchema = new mongoose.Schema({
    // _id: ObjectId,
    tags: [String],
    question: String,
    askedByUser: { type: ObjectId, ref: 'User' },
    questionVotes: Number,
    answers: [{
        // _id: ObjectId,
        answer: String,
        answeredByUser: { type: ObjectId, ref: 'User' },
        isCorrectAnswer: Boolean,
        answerVotes: Number
    }]
});

//find all questions
questionSchema.statics.getPopularQuestions = function (req, res) {
    const Question = this;

    Question.find((err, doc) => {
        if (err) {
            console.log('Unable to fetch data ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

//get all tags
questionSchema.statics.getTags = function (req, res) {
    const Question = this;
    let tags = [];

    Question.find({}, 'tags', (err, docs) => {
        docs.forEach(tag => {
            console.log('tag ', ...tag.tags);
            if (!tags.includes(...tag.tags)) {
                tags.push(...tag.tags);
            }
        });
        res.json(tags);
    });
}

questionSchema.statics.getUnansweredQuestions = function(req, res) {
    const Question = this;
    
    Question.find({answers: {$size: 0}}, (err, docs) => {
        if (err) {
            console.log('Unable to find unanswered questions ', err);
        } else {
            res.status(200).json(docs);
        }
    })
}

//find questions by user(name)
questionSchema.statics.findQuestionsByUser = function (req, res) {
    const userId = req.header('userId');
    const Question = this;

    Question.find({ 'askedByUser._id': userId }, (err, doc) => {
        if (err) {
            console.log('Unable to fetch data ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

//find questions by tag
questionSchema.statics.findQuestionsByTag = function (req, res) {
    const tag = req.header('tag');
    const Question = this;

    Question.find({ tags: tag }, (err, doc) => {
        if (err) {
            console.log('Unable to fetch data ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

//find question by ID
questionSchema.statics.findQuestionById = function (req, res) {
    const questionId = req.params.id;
    console.log('question id', questionId);
    const Question = this;

    // Question.findById({ _id: new ObjectId(questionId) }, (err, doc) => {
    Question.findById({ _id: questionId }, (err, doc) => {
        if (err) {
            console.log('Unable to fetch data ', err);
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
questionSchema.statics.voteQuestion = function(req, res) {
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
            $set: { question: newQuestion }
        }, {
            //option
            returnOriginal: false
        }, (err, doc) => {
            if (err) {
                console.log('Unable to update question ', err);
            } else {
                res.status(200).json('question-updated');
            }
        });
}

//delete question
questionSchema.statics.deleteQuestion = function (req, res) {
    const questionId = req.body.questionId;
    const Question = this;

    console.log('question Id to delete', questionId);

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
    const userId = req.header('user');
    const Question = this;

    Question.find({
        answers: { 'answeredByUser._id': userId }
    }).then(docs => {
        res.json(docs);
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
                console.log('result ',doc);
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
    const Question = this;

    Question.updateOne(
        { _id: questionId, 'answers.isCorrectAnswer': true },
        { $set: { 'answers.$.isCorrectAnswer': false } },
        (err, doc) => {
            if (err) {
                console.log('Unable to update correct answer ', err);
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
                )
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
