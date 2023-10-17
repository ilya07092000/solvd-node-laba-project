import express from 'express';
import { config } from 'dotenv';
import api from './router/api';
import { redisConnectionInstance } from './db/redis/connection';
import errorHandlerMiddleWare from './middlewares/errorHandler.middleware';

config();
const app = express();

app.use(express.json());
app.use('/api/v1', api);
app.use(errorHandlerMiddleWare);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

async function booststrap() {
  await redisConnectionInstance.makeConnection();

  app.listen(process.env.PORT, () =>
    console.log(`Running on port ${process.env.PORT}`),
  );
}

booststrap();
