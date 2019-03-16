const { mongoose } = require('../database/mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const { User } = require('../models/user');

const questionSchema = new mongoose.Schema({
    _id: ObjectId,
    tags: [String],
    question: String,
    askedByUser: { type: ObjectId, ref: 'User' },
    questionVotes: Number,
    answers: [{
        _id: ObjectId,
        answer: String,
        answeredByUser: { type: ObjectId, ref: 'User' },
        isCorrectAnswer: Boolean,
        answerVotes: Number
    }]
});

//find all questions
questionSchema.statics.getPopularQuestions = function (req, res) {
    const Question = this;

    Question.find((error, doc) => {
        if (error) {
            console.log('Unable to fetch data ', error);
        } else {
            res.status(200).json(doc);
        }
    });
}

//find questions by user(name)
questionSchema.statics.findQuestionsByUser = function (req, res) {
    const Question = this;
    const user = req.header('user');

    Question.find({ askedByUser: user }).toArray((error, doc) => {
        console.log(doc);
        res.send(doc);
    });
}

//find questions by tag
questionSchema.statics.findQuestionsByTag = function (req, res) {
    const Question = this;
    const tag = req.header('tag');

    Question.find({ tags: tag }).toArray((error, doc) => {
        console.log(doc);
        res.send(doc);
    });
}

//find question by ID
questionSchema.statics.findQuestionsByID = function (req, res) {
    const Question = this;

    Question.findById({ _id: new ObjectId(req.params.id) }, (error, doc) => {
        if (error) {
            console.log('Unable to fetch data ', error);
        } else {
            res.json(doc);
        }
    })
}

//create question
questionSchema.statics.createQuestion = function (req, res) {
    const Question = this;

    Question.create(req.body, (error, result) => {
        if (error) {
            console.log('Cannot create question');
        }
        res.status(200).send(result);
    });
}

//edit question
questionSchema.statics.editQuestion = function (req, res) {
    const id = req.body._id;
    const newQuestion = req.body.newQuestion;
    const Question = this;

    Question.findOneAndUpdate(
        {
            //filter
            _id: new ObjectId(id)
        }, {
            //update
            $set: { question: newQuestion }
        }, {
            //option
            returnOriginal: false
        }, (error, result) => {
            if (error) {
                console.log(error);
            };
            res.status(200).send(result);
        });

}

//upvote, downvote question
questionSchema.statics.voteQuestion = (req, res) => {
    const Question = this;
    let question;
    const upvote = req.body.upvote;
    let newVotes = 0;

    Question.findById({ _id: new ObjectId(req.body._id) }, (error, doc) => {
        question = doc;
    })

    if (upvote) {
        newVotes = question.questionVotes + 1;
    } else {
        newVotes = question.questionVotes - 1;
    }
    Question.findOneAndUpdate(
        { _id: new ObjectId(req.body._id) },
        { $set: { 'question.questionVotes': newVotes } },
        (error, result) => {
            console.log('error: ', error, '| result: ', result);
            if (result) {
                res.send(result);
            }
        });
}

//delete question
questionSchema.statics.deleteQuestion = function (req, res) {
    const Question = this;
    let id = req.body._id;

    Question.findOneAndDelete({ _id: new ObjectId(id) }, (error, result) => {
        if (error) {
            console.log(error);
        };
        res.status(200).send(result);
    });
}

//Find answers by user with model method
questionSchema.statics.findAnswersByUser = function (req, res) {
    if (req.user) {
        const Question = this;
        let user = req.user;
        let userAnswers;

        Question.find(
            {
                answers: {
                    $elemMatch: {
                        answeredByUser: user.username
                    }
                }
            }).then(docs => {
                userAnswers = docs;
                res.json(userAnswers);
            });
    }
}

//add answer
questionSchema.statics.addAnswer = function (req, res) {
    const Question = this;
    let id = req.body._id;
    let answer = req.body.answer;

    Question.updateOne(
        { _id: new ObjectId(id) },
        //Push answer to answers array
        { $push: { answers: answer } },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )
}

//edit answer
questionSchema.statics.editAnswer = function (req, res) {
    const Question = this;
    let id = req.body._id,
        oldAnswer = req.body.oldAnswer,
        newAnswer = req.body.newAnswer;

    Question.updateOne(
        { _id: new ObjectId(id) },
        { $set: { 'answers.$[element].answer': newAnswer.answer } },
        //Filter answers array to update
        { arrayFilters: [{ "element.answer": oldAnswer.answer }] },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )
}

//update correct answer
questionSchema.statics.updateCorrectAnswer = function (req, res) {
    const Question = this;
    let id = req.body._id,
        i = req.body.i;

    Question.updateOne(
        { _id: new ObjectId(id), 'answers.isCorrectAnswer': true },
        { $set: { 'answers.$.isCorrectAnswer': false } },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )

    setObject = {};
    setObject['answers.' + i + '.isCorrectAnswer'] = true;
    Question.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: setObject
        },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )
}

//upvote, downvote answer
questionSchema.statics.voteAnswer = function (req, res) {
    let question = req.body.question,
        answer = req.body.answer,
        upvote = req.body.upvote;
    let newVotes = 0;
    if (upvote) {
        newVotes = answer.answerVotes + 1;
    } else {
        newVotes = answer.answerVotes - 1;
    }
    try {
        db.getDb().collection('questions').updateOne(
            { question: question },
            { $set: { 'answers.$[element].answerVotes': newVotes } },  //update votes for the answer
            { arrayFilter: [{ 'element.answer': answer }] }
        );
    } catch (e) {
        console.log(e);
    }
    res.send('vote-answer');
}

//delete answer
questionSchema.statics.deleteAnswer = function (req, res) {
    var Question = this;
    let id = req.body._id,
        answer = req.body.answer;

    Question.updateOne(
        { _id: new ObjectId(id) },
        { $pull: { answers: { answer: answer.answer } } },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )
}

const Question = mongoose.model('Question', questionSchema);

module.exports = { Question };
