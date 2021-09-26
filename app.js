var express = require('express');
var logger = require('morgan');

var app = express();
var PORT = 3000;

app.use(logger('dev'));

app.get('/webpage/count', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
