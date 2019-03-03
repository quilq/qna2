/*QUESTION:
tags: string[],
question: string,
askedByUser: user,
votes: number
answers: [{
    answer: string,
    answeredByUser: user,
    isCorrectAnswer: boolean
    votes: number
}]
*/
const db = require('./../database/mongodb');

const getPopularQuestions = (req, res) => {
    db.getDb().collection('questions').find().limit(20).toArray((error, doc) => {
        console.log(doc);
        res.send(doc);
    })
}

//find questions by user(name)
const findQuestionsByUser = (req, res) => {
    let user = req.header('user');
    db.getDb().collection('questions').find({ askedByUser: user }).toArray((error, doc) => {
        console.log(doc);
        res.send(doc);
    });
}

//find questions by tag
const findQuestionsByTag = (req, res) => {
    let tag = req.header('tag');
    db.getDb().collection('questions').find({ tags: tag }).toArray((error, doc) => {
        console.log(doc);
        res.send(doc);
    });
}

//create question insertOne(doc, options, callback)
const createQuestion = (req, res) => {
    let question = req.body.question;
    db.getDb().collection('questions').insertOne(question, (error, result) => {
        console.log('error: ', error, '| res: ', result);
        if (result){
            res.send(result);
        }
    })
}

//edit question updateOne(filter, update, options)
const editQuestion = (req, res) => {
    let question = req.body.question, 
    newQuestion = req.body.newQuestion;
    db.getDb().collection('questions').updateOne(
        { question: question },
        { $set: { question: newQuestion } },
        (error, result) => {
            console.log('error: ', error, '| res: ', result);
            if (result){
                res.send(result);
            }
        });
}

//upvote, downvote question
const voteQuestion = (req, res) => {
    let question = req.body.question, 
    upvote = req.body.upvote,
    newVotes = 0;
    if (upvote) {
        newVotes = question.votes + 1;
    } else {
        newVotes = question.votes - 1;
    }
    db.getDb().collection('questions').updateOne(
        { question: question },
        { $set: { 'question.votes': newVotes } },
        (error, result) => {
            console.log('error: ', error, '| result: ', result);
            if (result){
                res.send(result);
            }
        });
}

//delete question
const deleteQuestion = (req, res) => {
    let question = req.body.question;
    db.getDb().collection('questions').deleteOne({ question: question }, (error, result) => {
        console.log('error: ', error, '| result: ', result);
        if (result){
            res.send(result);
        }
    });
}

//add answer
const addAnswer = (req, res) => {
    let question = req.body.question, 
    newAnswer = req.body.newAnswer;
    db.getDb().collection('questions').updateOne(
        { question: question },
        { $push: { answers: newAnswer } },  //add new answer
        (error, result) => {
            console.log('error: ', error, '| res: ', result);
            if (result){
                res.send(result);
            }
        });
}

//edit answer
const editAnswer = (req, res) => {
    let question = req.body.question, 
    newAnswer = req.body.newAnswer, 
    oldAnswer = req.body.oldAnswer;
    try {
        db.getDb().collection('questions').updateOne(
            { question: question },
            { $set: { 'answers.$[element].answer': newAnswer } },  //replace old answer with new answer
            { arrayFilter: [{ 'element.answer': oldAnswer }] }
        );
    } catch (e) {
        console.log(e);
    };
    res.send('edit-answer');
}

//update correct answer
const updateCorrectAnswer = (req, res) => {
    let question = req.body.question, 
    correctAnswer = req.body.correctAnswer;
    try {
        db.getDb().collection('questions').updateOne(
            { question: question },
            { $set: { 'answers.$[element].isCorrectAnswer': true } },  //update correct answer @ element
            { arrayFilter: [{ 'element.answer': correctAnswer }] }  //where element.answer = correctAnswer
        );
    } catch (e) {
        console.log(e);
    }
    res.send('updated-correct-answer');
}

//upvote, downvote answer
const voteAnswer = (req, res) => {
    let question = req.body.question, 
    answer = req.body.answer, 
    upvote = req.body.upvote;
    let newVotes = 0;
    if (upvote) {
        newVotes = answer.votes + 1;
    } else {
        newVotes = answer.votes - 1;
    }
    try {
        db.getDb().collection('questions').updateOne(
            { question: question },
            { $set: { 'answers.$[element].votes': newVotes } },  //update votes for the answer
            { arrayFilter: [{ 'element.answer': answer }] }
        );
    } catch (e) {
        console.log(e);
    }
    res.send('vote-answer');
}

//delete answer
const deleteAnswer = (req, res) => {
    let question = req.body.question, 
    answerToDelete = req.body.answerToDelete;
    db.getDb().collection('questions').updateOne(
        { question: question },
        { $pull: { answers: { answer: answerToDelete } } },  //delete answerToDelete
        (error, result) => {
            console.log('error: ', error, '| result: ', result);
            if (result){
                res.send(result);
            }
        });
}

module.exports = {
    getPopularQuestions,
    findQuestionsByUser,
    findQuestionsByTag,
    createQuestion,
    editQuestion,
    voteQuestion,
    deleteQuestion,
    addAnswer,
    updateCorrectAnswer,
    editAnswer,
    voteAnswer,
    deleteAnswer
};
