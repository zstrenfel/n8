const request = require('supertest');
const app = require('../../app');
const utils = require('../../utils');

jest.mock('../../utils');

EXAMPLE_COUNTS = {
  spongebob: 1,
  squarepants: 1,
};

describe('POST webpage/count', () => {
  it('should accept application/json"', async () => {
    const expected = EXAMPLE_COUNTS;
    utils.countWords.mockReturnValue(expected);

    const response = await request(app)
      .post('/webpage/count')
      .type('application/json')
      .send({ url: 'https://spongebob.com' });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expected);
  });

  it('should accept application/x-www-form-urlencoded"', async () => {
    const expected = EXAMPLE_COUNTS;
    utils.countWords.mockReturnValue(expected);

    const response = await request(app)
      .post('/webpage/count')
      .type('application/x-www-form-urlencoded')
      .send('url=https://krabbypatty.com');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expected);
  });

  it('should return 500 if no url specified', async () => {
    const response = await request(app)
      .post('/webpage/count')
      .send({ patrick: 'star' });
    expect(response.statusCode).toEqual(500);
  });
});
