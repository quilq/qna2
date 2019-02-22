const express = require('express');
const router = express.Router();

const user = require('../models/user');
const question = require('../models/question');

router.get('/', (req, res) => {
    res.send('');
});

module.exports = router;