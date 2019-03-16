const express = require('express');
const router = express.Router();

const { User } = require('../models/user');
const { Question } = require('../models/question');

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


//Get user info (private route)
router.get('/user/me', authenticate, (req, res) => {
    Question.findQuestionsByUser(req, res);
})

//Sign up route
router.post('/user/signup', (req, res) => {
    var body = { username: req.body.username, email: req.body.email, password: req.body.password };
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//Log in route
router.post('/user/login', (req, res) => {
    var body = { email: req.body.email, password: req.body.password };

    //Find user
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        console.log('log in error ', e);
        res.status(400).send(e);
    });
})

//Log out route
router.delete('/user/me/token', authenticate, (req, res) => {
    if (req.user) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
})

module.exports = router;