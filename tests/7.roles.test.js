const app = require('../src/index');
const request = require('supertest');
const { loginRequest, adminCreds } = require('./helpers/mock-login');

describe('roles', () => {
  let adminAccessToken;

  beforeAll(async () => {
    const admin = await loginRequest(app, request, adminCreds);
    adminAccessToken = admin.body.result.tokens.access;
  });

  it('get all roles', async () => {
    const response = await request(app)
      .get(`${process.env.API}/roles`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('try to create a role', async () => {
    const response = await request(app)
      .post(`${process.env.API}/roles`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });

  it('try to get unexisting role', async () => {
    const response = await request(app)
      .get(`${process.env.API}/roles/213`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('try to delett unexisting role', async () => {
    const response = await request(app)
      .delete(`${process.env.API}/roles/9999`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });
});
