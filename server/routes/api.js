const express = require('express');
const user = require('../models/user');
const question = require('../models/question');

const router = express.Router();

router.get('/', (req, res) => {
    user.getUsers();
    question.getQuestions();
    res.send('Hello world !');
});

module.exports = router;