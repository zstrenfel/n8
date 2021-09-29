const request = require('supertest');
const app = require('../../app');

describe('GET webpage/count', () => {
  it('should handle application/json requests"', async () => {
    const response = await request(app)
      .get('/count')
      .query({ url: 'https://google.com' });
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('application/json'),
    );
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
  });

  it('should count words for text/plain websites', async () => {
    const response = await request(app)
      .get('/count')
      .query({ url: 'https://norvig.com/big.txt' });
    expect(response.statusCode).toEqual(200);
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('application/json'),
    );
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
  });

  it('should return an error response for invalid URLs.', async () => {
    const response = await request(app).get('/count').query({ url: 'goog' });
    expect(response.statusCode).toEqual(500);
  });
});
