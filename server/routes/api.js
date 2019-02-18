const express = require('express');
const router = express.Router();

const user = require('../models/user');
const question = require('../models/question');


router.get('/', (req, res) => {
    user.getUsers();
    question.getQuestions();
    res.send('Hello world !');
});

module.exports = router;