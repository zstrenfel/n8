var express = require('express');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.post('/webpage/count', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
