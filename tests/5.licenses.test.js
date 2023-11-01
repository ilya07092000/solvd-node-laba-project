const app = require('../src/index');
const request = require('supertest');
const {
  loginRequest,
  adminCreds,
  lawyerCreds,
  registerRequest,
} = require('./helpers/mock-login');
const { getLawyer } = require('./helpers/lawyer');

describe('cases', () => {
  let adminAccessToken;
  let lawyerAccessToken;
  let newLicenseId;

  let lawyerId;

  beforeAll(async () => {
    const admin = await loginRequest(app, request, adminCreds);
    adminAccessToken = admin.body.result.tokens.access;

    const lawyer = await getLawyer();
    lawyerId = +lawyer.lawyer.lawyer.id;
    lawyerAccessToken = lawyer.lawyerAccessToken;
  });

  it('creates a license', async () => {
    const response = await request(app)
      .post(`${process.env.API}/licenses`)
      .set({ Authorization: `Bearer ${adminAccessToken}` })
      .send({
        lawyerId,
        info: 'some license',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.result).toHaveProperty('id');
    newLicenseId = response.body.result.id;
  });

  it('trye to creates a license', async () => {
    const response = await request(app)
      .post(`${process.env.API}/licenses`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });

  it('get not existing license', async () => {
    const response = await request(app)
      .get(`${process.env.API}/licenses/9999`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('delete not existing license', async () => {
    const response = await request(app)
      .delete(`${process.env.API}/licenses/9999`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('get all licenses', async () => {
    const response = await request(app)
      .get(`${process.env.API}/licenses`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('verify license', async () => {
    const response = await request(app)
      .put(`${process.env.API}/licenses/${newLicenseId}/verify`)
      .set({ Authorization: `Bearer ${adminAccessToken}` })
      .send({
        notes: 'license is good!',
      });

    expect(response.statusCode).toBe(200);
  });

  it('try to verify license', async () => {
    const response = await request(app)
      .put(`${process.env.API}/licenses/${newLicenseId}/verify`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });

  it('reject license', async () => {
    const response = await request(app)
      .put(`${process.env.API}/licenses/${newLicenseId}/verify`)
      .set({ Authorization: `Bearer ${adminAccessToken}` })
      .send({
        notes: 'license is bad!',
      });

    expect(response.statusCode).toBe(200);
  });

  it('try to reject license', async () => {
    const response = await request(app)
      .put(`${process.env.API}/licenses/${newLicenseId}/verify`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });

  it('get all verifications', async () => {
    const response = await request(app)
      .get(`${process.env.API}/verifications`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(200);
  });

  it('get unexisting verifications', async () => {
    const response = await request(app)
      .get(`${process.env.API}/verifications/9999`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(404);
  });

  it('get unexisting verifications', async () => {
    const response = await request(app)
      .post(`${process.env.API}/verifications`)
      .set({ Authorization: `Bearer ${adminAccessToken}` });

    expect(response.statusCode).toBe(400);
  });
});
