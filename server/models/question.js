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
    db.get().collection('questions').find({}).toArray((err, doc) => {
        console.log(doc);
    });
}

module.exports = { getQuestions };
