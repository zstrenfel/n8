const request = require('supertest');
const app = require('../../dist/app');

describe('POST webpage/count', () => {
  it('should handle application/json requests"', async () => {
    const response = await request(app)
      .post('/webpage/count')
      .type('application/json')
      .send({ url: 'https://google.com' });
    expect(response.statusCode).toEqual(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
  });

  it('should handle application/x-www-form-urlencoded requests', async () => {
    const response = await request(app)
      .post('/webpage/count')
      .type('application/x-www-form-urlencoded')
      .send('url=https://google.com');
    expect(response.statusCode).toEqual(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
  });

  it('should count words for text/plain websites', async () => {
    const response = await request(app)
      .post('/webpage/count')
      .type('application/json')
      .send({ url: 'https://norvig.com/big.txt' });
    expect(response.statusCode).toEqual(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0);
  });
});
