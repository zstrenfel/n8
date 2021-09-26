const express = require('express');
const logger = require('morgan');

const utils = require('./utils');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.post('/webpage/count', async (request, response, next) => {
  try {
    const url = request.body['url'];
    if (!url) {
      throw new Error('URL not specified.');
    }

    const webpage = await utils.fetchWebpage(url);
    response.send('Hello World!');
  } catch (error) {
    next(error);
  }
});

module.exports = app;
