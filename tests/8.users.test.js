const app = require('../src/index');
const request = require('supertest');
const { loginRequest, adminCreds } = require('./helpers/mock-login');

describe('users', () => {
  let adminAccessToken;

  beforeAll(async () => {
    const admin = await loginRequest(app, request, adminCreds);
    adminAccessToken = admin.body.result.tokens.access;
  });

  it('get all users', async () => {
    const response = await request(app)
      .get(`${process.env.API}/users`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('try to create a user', async () => {
    const response = await request(app)
      .post(`${process.env.API}/users`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });

  it('try to get unexisting user', async () => {
    const response = await request(app)
      .get(`${process.env.API}/users/213`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('try to delett unexisting user', async () => {
    const response = await request(app)
      .delete(`${process.env.API}/users/9999`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });
});
