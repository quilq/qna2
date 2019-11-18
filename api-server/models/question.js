const { mongoose } = require('../database/mongoose');
const autopopulate = require('mongoose-autopopulate');
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionSchema = new mongoose.Schema({
    tags: [String],
    questionTitle: String,
    // questionTitle: {  
    //     type: String,
    //     index: 'text'  //for text searching
    // },
    questionContent: String,
    askedByUser: {
        type: ObjectId,
        ref: 'User',
        autopopulate: true
    },
    questionVotes: Number,
    answers: [{
        answer: String,
        answeredByUser: {
            type: ObjectId,
            ref: 'User',
            autopopulate: true
        },
        isCorrectAnswer: Boolean,
        answerVotes: Number,
        createdAt: Date
    }],
    createdAt: Date
});

//auto populate user
questionSchema.plugin(autopopulate);

questionSchema.statics.getPopularQuestions = function (req, res) {
    const Question = this;
    const skip = ((req.query.next) * 1);

    //return doc = [{questions [{--}], totalQuestions [{count: --}]}]
    Question.aggregate(
        [
            {
                '$facet': {
                    'questions': [
                        { '$match': {} },
                        { '$sort': { questionVotes: -1 } },
                        { '$skip': skip },
                        { '$limit': 10 }
                    ],
                    'totalQuestions': [
                        { '$count': 'count' }
                    ]
                }
            },
        ], (err, doc) => {
            if (err) {
                console.log('Unable to get popular questions ', err);
            } else {
                //aggregate wont apply autopopulate => need another query for populating
                Question.populate(doc[0].questions, {path: 'askedByUser'}, (err2, doc2) => {
                    if (err2) {
                        console.log('Cannot populate popular questions ', err2);
                    } else {
                        res.status(200).json(doc[0]);
                    }
                });
            }
        }
    );
}

questionSchema.statics.getRecentQuestions = function (req, res) {
    const Question = this;
    const skip = ((req.query.next) * 1);

    Question.aggregate(
        [
            {
                '$facet': {
                    'questions': [
                        { '$match': {} },
                        { '$sort': { createdAt: -1 } },
                        { '$skip': skip },
                        { '$limit': 10 }
                    ],
                    'totalQuestions': [
                        { '$count': 'count' }
                    ]
                }
            }
        ], (err, doc) => {
            if (err) {
                console.log('Unable to get recent questions ', err);
            } else {
                Question.populate(doc[0].questions, {path: 'askedByUser'}, (err2, doc2) => {
                    if (err2) {
                        console.log('Cannot populate recent questions ', err2);
                    } else {
                        res.status(200).json(doc[0]);
                    }
                });
            }
        }
    );
}

questionSchema.statics.getUnansweredQuestions = function (req, res) {
    const Question = this;
    const skip = ((req.query.next) * 1);

    Question.aggregate(
        [
            {
                '$facet': {
                    'questions': [
                        { '$match': { answers: { $size: 0 } } },
                        { '$skip': skip },
                        { '$limit': 10 }
                    ],
                    'totalQuestions': [
                        { '$match': { answers: { $size: 0 } } },
                        { '$count': 'count' }
                    ]
                }
            },
        ], (err, doc) => {
            if (err) {
                console.log('Unable to get unanswered questions ', err);
            } else {
                Question.populate(doc[0].questions, {path: 'askedByUser'}, (err2, doc2) => {
                    if (err2) {
                        console.log('Cannot populate unanswered questions ', err2);
                    } else {
                        res.status(200).json(doc[0]);
                    }
                });
            }
        }
    );
}

questionSchema.statics.getRelatedQuestions = function (req, res) {
    const Question = this;
    const tags = req.query.tags;

    Question.find({ tags: { $in: tags } }, null, { skip: 0, limit: 10 }, (err, doc) => {
        if (err) {
            console.log('Unable to find related questions ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

questionSchema.statics.findQuestionById = function (req, res) {
    const questionId = req.params.id;

    const Question = this;

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

questionSchema.statics.findQuestionsByUser = function (req, res) {
    const userId = req.query.userId;
    const Question = this;

    Question.find({ askedByUser: userId }, (err, doc) => {
        if (err) {
            console.log('Unable to fetch data ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

questionSchema.statics.findQuestionsByTag = function (req, res) {
    const skip = ((req.query.next) * 1);
    const tag = req.query.tag;

    const Question = this;

    Question.find({ tags: tag }, null, { skip: skip, limit: 10 }, (err, doc) => {
        if (err) {
            console.log('Unable to get questions by tag ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

questionSchema.statics.findQuestionsByKeywords = function (req, res) {
    const skip = ((req.query.next) * 1);
    const keywords = new RegExp(req.query.keywords);

    const Question = this;

    Question.find({ questionTitle: keywords }, null, { skip: skip, limit: 10 }, (err, doc) => {
        // Question.find({$text: {$search: `${keywords}` }}, null, {skip: 0, limit: 10}, (err, doc) => {
        if (err) {
            console.log('Unable to get questions by keywords ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

questionSchema.statics.createQuestion = function (req, res) {
    const Question = this;

    Question.create(req.body, (err, doc) => {
        if (err) {
            console.log('Unable to create question ', err);
        } else {
            res.status(200).json(doc);
        }
    });

}

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
                res.status(200).json(doc);
            }
        });
}

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
                res.status(200).json(doc);
            }
        });
}

questionSchema.statics.deleteQuestion = function (req, res) {
    const questionId = req.body.questionId;
    const Question = this;

    Question.findOneAndDelete({ _id: questionId }, (err, doc) => {
        if (err) {
            console.log('Unable to delete question ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

questionSchema.statics.findAnswersByUser = function (req, res) {
    const userId = req.query.userId;
    const Question = this;

    Question.find({ 'answers.answeredByUser': userId }, (err, doc) => {
        if (err) {
            console.log('Unable to find answers by user ', err);
        } else {
            res.status(200).json(doc);
        }
    });

}

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
                res.status(200).json(doc);
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
                res.status(200).json(doc);
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
                if (undo) {
                    res.status(200).json(doc);
                } else {
                    Question.updateOne(
                        { _id: questionId, 'answers._id': correctAnswerId },
                        { $set: { 'answers.$.isCorrectAnswer': true } },
                        (err2, doc2) => {
                            if (err) {
                                console.log('Unable to update correct answer ', err2);
                            } else {
                                res.status(200).json(doc2);
                            }
                        }
                    );
                }
            }
        }
    )

}

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
                res.status(200).json(doc);
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
                res.status(200).json(doc);
            }
        }
    )
}

const Question = mongoose.model('Question', questionSchema);

module.exports = { Question };
