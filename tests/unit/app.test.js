const request = require('supertest');
const app = require('../../app');
const utils = require('../../utils');

jest.mock('../../utils');

EXAMPLE_COUNTS = {
  spongebob: 1,
  squarepants: 1,
};

describe('POST webpage/count', () => {
  it('should parse webpage on valid request"', async () => {
    const expected = EXAMPLE_COUNTS;
    utils.countWords.mockReturnValue(expected);

    const response = await request(app)
      .get('/count')
      .query({ url: 'https://spongebob.com' });
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('application/json'),
    );
    expect(response.body).toEqual(expected);
  });

  it('should return 500 if no url specified', async () => {
    const response = await request(app)
      .get('/count')
      .query({ patrick: 'star' });
    expect(response.statusCode).toEqual(500);
  });
});
