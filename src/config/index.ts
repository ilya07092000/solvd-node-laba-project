const configObject = {
  development: {
    redis: {},
  },

  production: {
    redis: {
      socket: {
        host: 'redis',
        port: 6379,
      },
    },
  },
};

export default configObject[process.env.NODE_ENV];
