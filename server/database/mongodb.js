const MongoClient = require('mongodb').MongoClient;

const MONGODB_URL = 'mongodb://localhost:27017/qna2';

MongoClient.connect(MONGODB_URL, { useNewUrlParser: true }, (err, db) => {
    console.log(`Connected successfully to server. `);

    db.close();
});

module.exports = { MongoClient };