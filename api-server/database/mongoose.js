const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.pluralize(null);

module.exports = { mongoose };