/*USER:
username: string,
email: string,
password: string
*/
const db = require('./../database/mongodb');

const getUsers = () => {
    db.get().collection('users').find({}).toArray((err, doc) => {
        console.log(doc);
    });
};

module.exports = { getUsers };