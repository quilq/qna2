const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/api');
const db = require('./database/mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', api);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

db.connectDb(()=> {
    app.listen(port, ()=> {
        console.log(`Server is running on port ${port}!`);
    });
});

