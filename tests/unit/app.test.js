const request = require('supertest');
const app = require('../../app');

describe('GET webpage/count', () => {
  it('should accept application/json"', async () => {
    const response = await request(app)
      .post('/webpage/count')
      .type('application/json')
      .send({ url: 'https://spongebob.com' });
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hello World!');
  });

  it('should accept application/x-www-form-urlencoded"', async () => {
    const response = await request(app)
      .post('/webpage/count')
      .type('application/x-www-form-urlencoded')
      .send('url=https://krabbypatty.com');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hello World!');
  });
});
