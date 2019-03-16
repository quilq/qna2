const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { mongoose } = require('../database/mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const { Question } = require('../models/question');

const userSchema = new mongoose.Schema({
    _id: ObjectId,
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    questions: [{ type: ObjectId, ref: 'Question' }],
    answers: [{ type: ObjectId, ref: 'Question' }]
});

//Hash password before saving
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

//Generate token with instance method
userSchema.methods.generateAuthToken = function () {
    //Avoid arrow function for 'this' keyword
    var user = this;

    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET, { expiresIn: '1d' }).toString();
    return Promise.resolve(token);
}

//Find user with model method
userSchema.statics.findByCredentials = function (email, password) {
    var User = this; //Uppercase for model method

    //Find user
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        //Return User if password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (e) {
        return Promise.reject(e);
    }

    return User.findOne({
        _id: decoded._id,
    });
}

//Modify object sent back to user (only send id & email)
userSchema.methods.toJSON = function () {
    var user = this;

    //Convert mongo object to regular object
    var userObject = user.toObject();
    return { _id: userObject._id, email: userObject.email, username: userObject.username }
}

var User = mongoose.model('User', userSchema);

module.exports = { User };