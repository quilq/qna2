const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'qna2';

let mongodb;
let db;

const connectDb = (callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        console.log(`Connected successfully to server.`);
        mongodb = client.db(dbName);
        db = client;
        callback();
    });
}

const getDb = () => {
    console.log('getDb called');
    return mongodb;
}

const closeDb = () => {
    console.log('closeDb called');
    db.close();
}

module.exports = { connectDb, getDb, closeDb };