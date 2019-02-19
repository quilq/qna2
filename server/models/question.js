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

//create question

//change question

//upvote, downvote question

//delete question

//add answer

//change answer

//update correct answer

//upvote, downvote answer

//delete answer

module.exports = { getQuestions };
