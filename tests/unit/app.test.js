const request = require('supertest');
const app = require('../../app');

describe('GET webpage/count', () => {
  it('should return "Hello World!"', async () => {
    const response = await request(app).get('/webpage/count');
    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual('Hello World!');
  });
});
