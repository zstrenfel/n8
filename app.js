const express = require('express');
const logger = require('morgan');
const { parseWebpage, countWords } = require('./utils');

const app = express();

app.use(logger('dev'));

app.get('/count', async (request, response, next) => {
  try {
    const url = request.query['url'];
    if (!url) {
      throw new Error('URL not specified.');
    }

    const webpageText = await parseWebpage(url);
    response.json(countWords(webpageText));
  } catch (error) {
    next(error);
  }
});

module.exports = app;
