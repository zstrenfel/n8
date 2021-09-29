const express = require('express');
const logger = require('morgan');
const { parseWebpage, countWords } = require('./utils');

const app: express.Application = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.get(
  '/webpage/count',
  async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const url = request.body['url'];
      if (!url) {
        throw new Error('URL not specified.');
      }

      const webpageText = await parseWebpage(url);
      response.json(countWords(webpageText));
    } catch (error) {
      next(error);
    }
  },
);

module.exports = app;
