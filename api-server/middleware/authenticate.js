const { User } = require('../models/user');

const authenticate = (req, res, next) => {

    const token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        next();

    }).catch((e) => {
        console.log('error ', e);
        res.status(401).send(e);
    })
};

module.exports = { authenticate };