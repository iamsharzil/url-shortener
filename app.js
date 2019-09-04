const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const indexRouter = require('./routes/indexRouter');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);

module.exports = app;
