const express = require('express');
const router = express.Router();

const user = require('../models/user');
const question = require('../models/question');

router.get('/', (req, res) => {
    res.send('');
});

//find questions by user
router.get('/q/user', (req, res)=>{
    findQuestionsByUser(req, res);
})

//find questions by tag
router.get('/q/tag', (req, res)=>{
    findQuestionsByTag(req, res);
})

//create question insertOne(doc, options, callback)
router.post('/q/add', (req, res)=>{
    createQuestion(req, res);
})

//edit question updateOne(filter, update, options)
router.put('/q/edit', (req, res)=>{
    editQuestion(req, res);
})

//upvote, downvote question
router.put('/q/vote', (req, res)=>{
    voteQuestion(question, upvote)
})

//delete question
router.delete('/q/delete/:id', (req, res)=>{
    
    deleteQuestion(question)
})

//add answer
router.put('/a/add', (req, res)=>{
    
    addAnswer(question, newAnswer)
})

//edit answer
router.put('/a/edit', (req, res)=>{
    
    editAnswer(question, newAnswer, oldAnswer)
})

//update correct answer
router.put('/a/update', (req, res)=>{
    
    updateCorrectAnswer(question, correctAnswer)
})

//upvote, downvote answer
router.put('/a/vote', (req, res)=>{
    
})
voteAnswer(question, answer, upvote)

//delete answer
router.put('/a/delete', (req, res)=>{
    
    deleteAnswer(question, answerToDelete)
})

module.exports = router;