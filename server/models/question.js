/*QUESTION:
tags: string[],
question: string,
askedByUser: user,
votes: number
answers: [{
    answer: string,
    answeredByUser: user,
    isCorrectAnswer: boolean
}]
*/
const db = require('./../database/mongodb');

//find questions by user/ by tag
const findQuestionsByUser = (user) => {
    db.getDb().collection('questions').find({ askedByUser: user }).toArray((err, doc) => {
        console.log(doc);
    });

}

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
    let question;
    db.getDb().collection('questions').deleteOne({ question: question }, (err, res) => {
        console.log('err: ', err, '| res: ', res);
    })
}

//add answer
const addAnswer = (question, newAnswer) => {
    let question;
    db.getDb().collection('questions').updateOne({})
}

//edit answer
const editAnswer = (question, newAnswer, oldAnswer) => {
    let question;
    db.getDb().collection('questions').updateOne({})
}

//update correct answer
const updateCorrectAnswer = (question, correctAnswer) => {
    let question;
    db.getDb().collection('questions').updateOne({})
}

//upvote, downvote answer
const voteAnswer = (question, answer, upvote) => {
    let question;
    db.getDb().collection('questions').updateOne({})
}

//delete answer
const deleteAnswer = (question, answer) => {
    let question;
    db.getDb().collection('questions').updateOne({})
}

module.exports = { getQuestions };
