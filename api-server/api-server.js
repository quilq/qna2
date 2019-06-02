
require('./config/config');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/api');

const app = express();
const port = process.env.PORT;

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});