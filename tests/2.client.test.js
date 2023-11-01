const app = require('../src/index');
const request = require('supertest');
const { loginRequest, adminCreds } = require('./helpers/mock-login');
const { getClient } = require('./helpers/client');
const { getLawyer } = require('./helpers/lawyer');

describe('client logic', () => {
  let clientAccessToken;
  let clientId;
  let lawyerId;
  let adminAccessToken;

  beforeAll(async () => {
    const admin = await loginRequest(app, request, adminCreds);
    adminAccessToken = admin.body.result.tokens.access;

    const client = await getClient();
    const lawyer = await getLawyer();

    expect(client).toBeTruthy();
    expect(lawyer).toBeTruthy();

    clientAccessToken = client.clientAccessToken;
    clientId = +client.client.client.id;
    lawyerId = +lawyer.lawyer.lawyer.id;
  });

  it('get all clients', async () => {
    const response = await request(app)
      .get(`${process.env.API}/clients`)
      .set({ Authorization: `Bearer ${clientAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('get wrong client', async () => {
    const response = await request(app)
      .get(`${process.env.API}/clients/9999`)
      .set({ Authorization: `Bearer ${clientAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('creates client case with unavailable lawyer', async () => {
    const response = await request(app)
      .post(`${process.env.API}/clients/cases`)
      .set({ Authorization: `Bearer ${clientAccessToken}` })
      .send({
        lawyerId,
        budget: 100,
        description: 'Some case',
      });

    expect(response.statusCode).toBe(400);
  });

  it('return client cases', async () => {
    const response = await request(app)
      .get(`${process.env.API}/clients/${clientId}/cases`)
      .set({ Authorization: `Bearer ${clientAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('try to create a client', async () => {
    const response = await request(app)
      .post(`${process.env.API}/clients`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });

  it('return client by id', async () => {
    const response = await request(app)
      .get(`${process.env.API}/clients/${clientId}`)
      .set({ Authorization: `Bearer ${clientAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('try to get access without token to clients', async () => {
    const response = await request(app).get(`${process.env.API}/clients`);

    expect(response.statusCode).toBe(401);
  });

  it('try to get access without token to client', async () => {
    const response = await request(app).get(`${process.env.API}/clients/1`);

    expect(response.statusCode).toBe(401);
  });
});
