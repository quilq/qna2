const express = require('express');
const router = express.Router();

const user = require('../models/user');
const question = require('../models/question');

router.get('/q', (req, res) => {
    question.getPopularQuestions(req, res);
});

//find questions by user
router.get('/q/user', (req, res) => {
    question.findQuestionsByUser(req, res);
})

//find questions by tag
router.get('/q/tag', (req, res) => {
    question.findQuestionsByTag(req, res);
})

//create question insertOne(doc, options, callback)
router.post('/q/add', (req, res) => {
    question.createQuestion(req, res);
})

//edit question updateOne(filter, update, options)
router.put('/q/edit', (req, res) => {
    question.editQuestion(req, res);
})

//upvote, downvote question
router.put('/q/vote', (req, res) => {
    question.voteQuestion(req, res);
})

//delete question
router.delete('/q/delete', (req, res) => {
    question.deleteQuestion(req, res);
})

//add answer
router.put('/a/add', (req, res) => {
    question.addAnswer(req, res);
})

//edit answer
router.put('/a/edit', (req, res) => {
    question.editAnswer(req, res);
})

//update correct answer
router.put('/a/update', (req, res) => {
    question.updateCorrectAnswer(req, res);
})

//upvote, downvote answer
router.put('/a/vote', (req, res) => {
    question.voteAnswer(req, res);
})

//delete answer
router.put('/a/delete', (req, res) => {
    question.deleteAnswer(req, res);
})

module.exports = router;