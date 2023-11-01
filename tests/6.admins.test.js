const app = require('../src/index');
const request = require('supertest');
const { loginRequest, adminCreds } = require('./helpers/mock-login');

describe('Admins Logic', () => {
  let adminAccessToken;

  beforeAll(async () => {
    const admin = await loginRequest(app, request, adminCreds);
    adminAccessToken = admin.body.result.tokens.access;
  });

  it('get all admins', async () => {
    const response = await request(app)
      .get(`${process.env.API}/admins`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('get wrong admin', async () => {
    const response = await request(app)
      .get(`${process.env.API}/admins/9999`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('try to create admin without data', async () => {
    const response = await request(app)
      .post(`${process.env.API}/admins`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });

  it('try to upate admin which does not exist', async () => {
    const response = await request(app)
      .put(`${process.env.API}/admins/9999`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });
});
