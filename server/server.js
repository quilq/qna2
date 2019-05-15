require('./config/config');
// const compression = require('compression');
const helmet = require('helmet');

const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');

const api = require('./routes/api');

const app = express();
const port = process.env.PORT;

app.use(helmet());
// app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Output folder
// const publicPath = path.join(__dirname, './../dist/qna2');
// app.use(express.static(publicPath));

app.use('/api', api);

//Send all other routes (define last):
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './../dist/qna2/index.html'));
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});


