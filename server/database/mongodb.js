const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/qna';
const dbName = 'qna2';

let mongodb;
let db;

const connect = (callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        console.log(`Connected successfully to server.`);
        mongodb = client.db(dbName);
        db = client;
        callback();
    });
}

const get = () => {
    return mongodb;
}

const close = () => {
    db.close();
}

module.exports = { connect, get, close };