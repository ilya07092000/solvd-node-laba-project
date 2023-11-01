const { loginRequest, registerRequest, clientCreds } = require('./mock-login');
const app = require('../../src/index');
const request = require('supertest');

const getClient = async () => {
  let clientAccessToken;

  let clientLogin = await loginRequest(app, request, clientCreds);
  if (clientLogin.statusCode !== 200) {
    await registerRequest(app, request, clientCreds);
    clientLogin = await registerRequest(app, request, clientCreds);
  }
  clientAccessToken = clientLogin.body.result.tokens.access;

  const clientInfo = await request(app)
    .get(`${process.env.API}/profile`)
    .set({ Authorization: `Bearer ${clientAccessToken}` });

  return {
    client: clientInfo.body.result,
    clientAccessToken,
  };
};

module.exports = {
  getClient,
};
