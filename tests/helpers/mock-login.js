const adminCreds = {
  email: 'admin@admin.com',
  password: 'admin',
};

const lawyerCreds = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: `test-lawyer@gmail.com`,
  password: 'password',
  roleId: null,
  city: 'Kyiv',
};

const clientCreds = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: `test-client@gmail.com`,
  password: 'password',
  roleId: null,
  city: 'Kyiv',
};

const loginRequest = async (app, request, creds) => {
  const response = await request(app)
    .post(`${process.env.API}/auth/login`)
    .send(creds);
  return response;
};

const registerRequest = async (app, request, creds) => {
  const response = await request(app)
    .post(`${process.env.API}/auth/registration`)
    .send(creds);
  return response;
};

module.exports = {
  adminCreds,
  loginRequest,
  lawyerCreds,
  clientCreds,
  registerRequest,
};
