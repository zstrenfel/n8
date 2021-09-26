var express = require('express');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));

app.get('/webpage/count', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
