const request = require('supertest');
const app = require('../../app');

describe('POST webpage/count', () => {
  it('should handle application/json requests"', async () => {
    const expected = { google: expect.any(Number) };

    const response = await request(app)
      .post('/webpage/count')
      .type('application/json')
      .send({ url: 'https://google.com' });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(expected);
  });

  it('should handle application/x-www-form-urlencoded requests', async () => {
    const expected = { google: expect.any(Number) };

    const response = await request(app)
      .post('/webpage/count')
      .type('application/x-www-form-urlencoded')
      .send('url=https://google.com');
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(expected);
  });

  it('should count words for text/plain websites', async () => {
    const expected = { sherlock: expect.any(Number) };

    const response = await request(app)
      .post('/webpage/count')
      .type('application/json')
      .send({ url: 'https://norvig.com/big.txt' });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject(expected);
  });
});
