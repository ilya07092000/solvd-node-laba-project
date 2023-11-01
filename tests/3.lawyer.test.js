const app = require('../src/index');
const request = require('supertest');
const { getLawyer } = require('./helpers/lawyer');
const { loginRequest, adminCreds } = require('./helpers/mock-login');

describe('client logic', () => {
  let adminAccessToken;
  let lawyerAccessToken;
  let lawyerId;

  beforeAll(async () => {
    const admin = await loginRequest(app, request, adminCreds);
    adminAccessToken = admin.body.result.tokens.access;

    const lawyer = await getLawyer();
    lawyerId = +lawyer.lawyer.lawyer.id;

    expect(lawyer).toBeTruthy();
    lawyerAccessToken = lawyer.lawyerAccessToken;
    lawyerId = +lawyer.lawyer.lawyer.id;
  });

  it('get all lawyers', async () => {
    const response = await request(app)
      .get(`${process.env.API}/lawyers`)
      .set({ Authorization: `Bearer ${lawyerAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('get wrong lawyers', async () => {
    const response = await request(app)
      .get(`${process.env.API}/lawyers/9999`)
      .set({ Authorization: `Bearer ${lawyerAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('try to create a lawyer', async () => {
    const response = await request(app)
      .post(`${process.env.API}/lawyers`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });

  it('try to delete unexisting lawyer', async () => {
    const response = await request(app)
      .delete(`${process.env.API}/lawyers/99999`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('return lawyer by id', async () => {
    const response = await request(app)
      .get(`${process.env.API}/clients/${lawyerId}`)
      .set({ Authorization: `Bearer ${lawyerAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('get all lawyers cases', async () => {
    const response = await request(app)
      .get(`${process.env.API}/lawyers/${lawyerId}/cases`)
      .set({ Authorization: `Bearer ${lawyerAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('get all lawyers licenses', async () => {
    const response = await request(app)
      .get(`${process.env.API}/lawyers/${lawyerId}/licenses`)
      .set({ Authorization: `Bearer ${lawyerAccessToken}` });

    expect(response.statusCode).toBe(200);
  });
});
