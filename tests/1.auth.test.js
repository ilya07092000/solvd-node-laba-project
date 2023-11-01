const app = require('../src/index');
const request = require('supertest');
const {
  loginRequest,
  clientCreds,
  lawyerCreds,
  adminCreds,
  registerRequest,
} = require('./helpers/mock-login');

let adminAccessToken;

describe('auth logic', () => {
  let roles;

  beforeAll(async () => {
    const response = await request(app).get(`${process.env.API}/roles`);
    roles = response.body.result;
  });

  it('try to register new client', async () => {
    const response = await registerRequest(app, request, {
      ...clientCreds,
      roleId: roles.find((r) => r.type === 'client').id,
    });

    /**
     * IF CLIENT ALREADY EXISTS
     */
    if (
      response.statusCode === 400 &&
      JSON.parse(response?.error?.text)?.error?.message.includes('exists')
    ) {
      expect(response.statusCode).toBe(400);
    } else {
      expect(response.statusCode).toBe(201);
    }
  });

  it('try to register new lawyer', async () => {
    const response = await registerRequest(app, request, {
      ...lawyerCreds,
      roleId: roles.find((r) => r.type === 'lawyer').id,
    });

    /**
     * IF LAWYER ALREADY EXISTS
     */
    if (
      response.statusCode === 400 &&
      JSON.parse(response?.error?.text)?.error?.message.includes('exists')
    ) {
      expect(response.statusCode).toBe(400);
    } else {
      expect(response.statusCode).toBe(201);
    }
  });

  it('try to login admin', async () => {
    const response = await loginRequest(app, request, adminCreds);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('result.id');
    expect(response.body).toHaveProperty('result.email', adminCreds.email);
    expect(response.body).toHaveProperty('result.tokens');
    adminAccessToken = response.body.result.tokens.access;
  });

  it('try to get access to private route', async () => {
    const response = await request(app)
      .get(`${process.env.API}/users`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });
    expect(response.statusCode).toBe(200);
  });

  it('try to logout', async () => {
    const response = await request(app).post(`${process.env.API}/auth/logout`);
    expect(response.statusCode).toBe(400);
  });

  it('try to refresh token', async () => {
    const response = await request(app).post(
      `${process.env.API}/auth/refresh-token`,
    );
    expect(response.statusCode).toBe(400);
  });

  it('try to login without creds', async () => {
    const response = await loginRequest(app, request, {});

    expect(response.statusCode).toBe(400);
  });

  it('try to register without creds', async () => {
    const response = await registerRequest(app, request, {});

    expect(response.statusCode).toBe(400);
  });
});
