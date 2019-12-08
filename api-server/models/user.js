const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const { mongoose } = require('../database/mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
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
    intro: {
        type: String,
        default: '',
        maxlength: 200
    },
    memberSince: {
        type: Date,
        default: Date.now()
    },
    totalQuestions: Number,
    totalAnswers: Number
});

userSchema.statics.getAllUsers = function (option) {
    const User = this;
    let sortOption = {};

    if (option === 'by-user') {
        sortOption = { memberSince: -1 }
    } else if (option === 'top-contributor') {
        sortOption = { totalAnswers: -1 }
    }

    User.find({}, null, { sort: sortOption }, (err, doc) => {
        if (err) {
            console.log('Unable to find users ', err);
        } else {
            res.status(200).json(doc);
        }
    });
}

//Hash password before saving
userSchema.pre('save', function (next) {
    const user = this;    //Avoid arrow function (arrow functions explicitly prevent binding 'this')
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
    const user = this;

    const token = jwt.sign({ _id: user._id.toHexString() }, process.env.JWT_SECRET, { expiresIn: '1d' })
        .toString();

    return Promise.resolve(token);
}

//Find user with model method
userSchema.statics.findByCredentials = function (email, password) {
    const User = this; //Uppercase for model method

    //Find user
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject('wrong-email');
        }

        //Return User if password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject('wrong-password');
                }
            });
        });
    });
}

userSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject(e);
    }

    return User.findOne({ _id: decoded._id });
}

//Modify object sent back to user (only send id, email & username)
userSchema.methods.toJSON = function () {
    const user = this;

    //Convert mongo object to regular object
    const userObject = user.toObject();

    return { _id: userObject._id, email: userObject.email, username: userObject.username }
}

const User = mongoose.model('User', userSchema);

module.exports = { User };