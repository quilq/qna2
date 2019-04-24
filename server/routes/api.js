const express = require('express');
const router = express.Router();

const { User } = require('../models/user');
const { Question } = require('../models/question');
const { authenticate } = require('../middleware/authenticate');

//fetch questions, TODO: get questions sort by votes
router.get('/q', (req, res) => {
    Question.getPopularQuestions(req, res);
});

router.get('/q/recent-questions', (req, res) => {
    Question.getRecentQuestions(req, res);
})

router.get('/q/related-questions', (req, res) => {
    console.log('getRelatedQuestions API');
    Question.getRelatedQuestions(req, res);
})


//fetch all tags
router.get('/q/all-tags', (req, res) => {
    Question.getTags(req, res);
});

router.get('/q/unanswered-questions', (req, res) => {
    Question.getUnansweredQuestions(req, res);
})

//Find questions by Id
router.get('/q/id/:id', (req, res) => {
    Question.findQuestionById(req, res);
});

//find questions by user
router.get('/q/user', (req, res) => {
    Question.findQuestionsByUser(req, res);
});

//find questions by tag 
router.get('/q/tag', (req, res) => {
    Question.findQuestionsByTag(req, res);
});

//create question
// router.post('/q/add', (req, res) => {
//     Question.createQuestion(req, res);
// });
router.post('/q/add', authenticate, (req, res) => {
    Question.createQuestion(req, res);
});

//edit question
router.put('/q/edit', authenticate, (req, res) => {
    Question.editQuestion(req, res);
})

//upvote, downvote question
router.put('/q/vote', authenticate, (req, res) => {
    Question.voteQuestion(req, res);
})

//delete question
router.put('/q/delete', authenticate, (req, res) => {
    Question.deleteQuestion(req, res);
})

//add answer 
router.put('/a/add', authenticate, (req, res) => {
    Question.addAnswer(req, res);
})

//edit answer 
router.put('/a/edit', authenticate, (req, res) => {
    Question.editAnswer(req, res);
})

//update correct answer 
router.put('/a/update', authenticate, (req, res) => {
    Question.updateCorrectAnswer(req, res);
})

//upvote, downvote answer
router.put('/a/vote', authenticate, (req, res) => {
    Question.voteAnswer(req, res);
})

//delete answer
router.put('/a/delete', authenticate, (req, res) => {
    Question.deleteAnswer(req, res);
})

//Get user questions
router.get('/user/questions', authenticate, (req, res) => {
    Question.findQuestionsByUser(req, res);
});

//Get user answers
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
        console.log(token);
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        console.log(e);
        res.status(400).send(e);
    });
})

//Sign in route
router.post('/user/signin', (req, res) => {
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

//Sign out route
router.delete('/user/signout', authenticate, (req, res) => {
    if (req.user) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
})

//Authenticate user
router.get('/user/auth', authenticate, (req, res) => {
    if (req.user) {
        res.status(200).send(req.user);
    } else {
        res.status(400).send();
    }
})

module.exports = router;