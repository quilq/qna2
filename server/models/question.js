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

//find questions by user(name)
const findQuestionsByUser = (req, res) => {
    let user = req.user;
    db.getDb().collection('questions').find({ askedByUser: user }).toArray((err, doc) => {
        console.log(doc);
        res.send(doc);
    });
}

//find questions by tag
const findQuestionsByTag = (tag) => {
    db.getDb().collection('questions').find({ tags: tag }).toArray((err, doc) => {
        console.log(doc);
    });
}

//create question insertOne(doc, options, callback)
const createQuestion = (question) => {
    db.getDb().collection('questions').insertOne(question, (err, res) => {
        console.log('err: ', err, '| res: ', res);
    })
}

//edit question updateOne(filter, update, options)
const editQuestion = (question, newQuestion) => {
    db.getDb().collection('questions').updateOne(
        { question: question },
        { $set: { question: newQuestion } },
        (err, res) => {
            console.log('err: ', err, '| res: ', res);
        });
}

//upvote, downvote question
const voteQuestion = (question, upvote) => {
    let newVotes = 0;
    if (upvote) {
        newVotes = question.votes + 1;
    } else {
        newVotes = question.votes - 1;
    }
    db.getDb().collection('questions').updateOne(
        { question: question },
        { $set: { 'question.votes': newVotes } },
        (err, res) => {
            console.log('err: ', err, '| res: ', res);
        });
}

//delete question
const deleteQuestion = (question) => {
    db.getDb().collection('questions').deleteOne({ question: question }, (err, res) => {
        console.log('err: ', err, '| res: ', res);
    });
}

//add answer
const addAnswer = (question, newAnswer) => {
    db.getDb().collection('questions').updateOne(
        { question: question },
        { $push: { answers: newAnswer } },  //add new answer
        (err, res) => {
            console.log('err: ', err, '| res: ', res);
        });
}

//edit answer
const editAnswer = (question, newAnswer, oldAnswer) => {
    try {
        db.getDb().collection('questions').updateOne(
            { question: question },
            { $set: { 'answers.$[element].answer': newAnswer } },  //replace old answer with new answer
            { arrayFilter: [{ 'element.answer': oldAnswer }] }
        );
    } catch (e) {
        console.log(e);
    }
}

//update correct answer
const updateCorrectAnswer = (question, correctAnswer) => {
    try {
        db.getDb().collection('questions').updateOne(
            { question: question },
            { $set: { 'answers.$[element].isCorrectAnswer': true } },  //update correct answer @ element
            { arrayFilter: [{ 'element.answer': correctAnswer }] }  //where element.answer = correctAnswer
        );
    } catch (e) {
        console.log(e);
    }
}

//upvote, downvote answer
const voteAnswer = (question, answer, upvote) => {
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
}

//delete answer
const deleteAnswer = (question, answerToDelete) => {
    db.getDb().collection('questions').updateOne(
        { question: question },
        { $pull: { answers: { answer: answerToDelete } } },  //delete answerToDelete
        (err, res) => {
            console.log('err: ', err, '| res: ', res);
        });
}

module.exports = {
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
