const app = require('../src/index');
const request = require('supertest');
const { loginRequest, adminCreds } = require('./helpers/mock-login');

describe('cases', () => {
  let adminAccessToken;
  let clientId;
  let lawyerId;

  beforeAll(async () => {
    const admin = await loginRequest(app, request, adminCreds);
    adminAccessToken = admin.body.result.tokens.access;

    const clients = await request(app)
      .get(`${process.env.API}/clients`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });
    const lawyers = await request(app)
      .get(`${process.env.API}/lawyers`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    clientId = clients.body.result[0].id;
    lawyerId = lawyers.body.result[0].id;
  });

  it('creates empty case', async () => {
    const response = await request(app)
      .post(`${process.env.API}/cases`)
      .set({ Authorization: `Bearer ${adminAccessToken}` })
      .send({});

    expect(response.statusCode).toBe(400);
  });

  it('get wrong case', async () => {
    const response = await request(app)
      .get(`${process.env.API}/cases/23123123`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('tries to create a case, but lawyer is not available', async () => {
    const response = await request(app)
      .post(`${process.env.API}/cases`)
      .set({ Authorization: `Bearer ${adminAccessToken}` })
      .send({
        lawyerId,
        clientId,
        budget: 1,
        description: 'some case',
      });

    expect(response.statusCode).toBe(400);
  });

  it('get all cases', async () => {
    const response = await request(app)
      .get(`${process.env.API}/cases`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(200);
  });
});
