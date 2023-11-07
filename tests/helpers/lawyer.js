const { loginRequest, registerRequest, lawyerCreds } = require('./mock-login');
const app = require('../../src/index');
const request = require('supertest');

const getLawyer = async () => {
  let lawyerAccessToken;

  let lawyerLogin = await loginRequest(app, request, lawyerCreds);
  if (lawyerLogin.statusCode !== 200) {
    const response = await request(app).get(`${process.env.API}/roles`);
    roles = response.body.result;

    await registerRequest(app, request, {
      ...lawyerCreds,
      roleId: +roles.find((r) => r.type === 'lawyer').id,
    });
    lawyerLogin = await registerRequest(app, request, lawyerCreds);
  }
  lawyerAccessToken = lawyerLogin.body.result.tokens.access;

  const lawyerInfo = await request(app)
    .get(`${process.env.API}/profile`)
    .set({ Authorization: `Bearer ${lawyerAccessToken}` });

  return {
    lawyer: lawyerInfo.body.result,
    lawyerAccessToken,
  };
};

module.exports = {
  getLawyer,
};
