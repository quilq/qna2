const express = require('express');
const router = express.Router();

const { mongoose } = require('./../db/mongoose');
const { User } = require('../models/user');
const { Question } = require('../models/question');
const { authenticate } = require('../middleware/authenticate');

//fetch questions
router.get('/q', (req, res) => {
    Question.getPopularQuestions(req, res);
});

//Find questions  const questionId = req.params.id;
router.get('/q/:id', (req, res) => {  
    Question.findQuestionById(req, res);
});

//find questions by user       const userId = req.header('user');
router.get('/q/user', authenticate, (req, res) => {
    Question.findQuestionsByUser(req, res);
})

//find questions by tag      tag = req.header('tag');
router.get('/q/tag', (req, res) => {  
    Question.findQuestionsByTag(req, res);
})

//create question  question = req.body
router.post('/q/add', authenticate, (req, res) => {
    Question.createQuestion(req, res);
})

//edit question      const questionId = req.body.id;   const newQuestion = req.body.newQuestion;
router.put('/q/edit', authenticate, (req, res) => {
    Question.editQuestion(req, res);
})

//upvote, downvote question      const questionId = req.body.id;  req.body.upvote: true or false
router.put('/q/vote', authenticate, (req, res) => {
    Question.voteQuestion(req, res);
})

//delete question      const questionId = req.body.id;
router.delete('/q/delete', authenticate, (req, res) => {
    Question.deleteQuestion(req, res);
})

//add answer      const questionId = req.body.id;    const answer = req.body.answer;
router.put('/a/add', authenticate, (req, res) => {
    Question.addAnswer(req, res);
})

//edit answer      const questionId = req.body.questionId;
    // const answerId = req.body.answerId;
    // const newAnswer = req.body.newAnswer;
router.put('/a/edit', authenticate, (req, res) => {
    Question.editAnswer(req, res);
})

//update correct answer      const questionId = req.body.id; const i (position correct answer) = req.body.i;
router.put('/a/update', authenticate, (req, res) => {
    Question.updateCorrectAnswer(req, res);
})

//upvote, downvote answer
// const questionId = req.body.questionId;
// const answerId = req.body.answerId;
// req.body.upvote true or false
router.put('/a/vote', authenticate, (req, res) => {
    Question.voteAnswer(req, res);
})

//delete answer     const questionId = req.body.questionId;
    // const answerId = req.body.answerId;
router.put('/a/delete', authenticate, (req, res) => {
    Question.deleteAnswer(req, res);
})


//Get user info (private route)      const userId = req.header('user');
router.get('/user/questions', authenticate, (req, res) => {
    Question.findQuestionsByUser(req, res);
});

//       const userId = req.header('user');
router.get('/user/answers', authenticate, (req, res) => {
    Question.findAnswersByUser(req, res);
});

//Sign up route
router.post('/user/signup', (req, res) => {
    const body = { username: req.body.username, email: req.body.email, password: req.body.password };
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
})

//Log in route
router.post('/user/login', (req, res) => {
    const body = { email: req.body.email, password: req.body.password };

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