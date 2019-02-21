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

const getQuestions = () => {
    db.getDb().collection('questions').find({}).toArray((err, doc) => {
        console.log(doc);
    });
}

//find questions by user/ by tag
const findQuestionsByUser = () => {
    
}

const findQuestionsByTag = () => {
    
}

//create question
const createQuestion = () => {

}

//edit question
const editQuestion = () => {
    
}

//upvote, downvote question
const voteQuestion = () => {
    
}

//delete question
const deleteQuestion = () => {
    
}

//add answer
const addAnswer = () => {
    
}

//edit answer
const editAnswer = () => {
    
}

//update correct answer
const updateCorrectAnswer = () => {
    
}

//upvote, downvote answer
const voteAnswer = () => {
    
}

//delete answer
const deleteAnswer = () => {
    
}

module.exports = { getQuestions };
