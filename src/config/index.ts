import { config } from 'dotenv';
config();

const configObject = {
  development: {
    redis: {},
    postgres: {
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
  },

  production: {
    redis: {
      socket: {
        host: 'redis',
        port: 6379,
      },
    },
    postgres: {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
  },
};

export default configObject[process.env.NODE_ENV];
