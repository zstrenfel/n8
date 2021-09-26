const request = require('supertest');
const axios = require('axios');
const app = require('../../app');

jest.mock('axios');

axios.get.mockResolvedValue({ data: '<div>Hello World!</div>' });

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

  it('should return 500 if no url specified', async () => {
    const response = await request(app)
      .post('/webpage/count')
      .send({ patrick: 'star' });
    expect(response.statusCode).toEqual(500);
  });
});
