import { createClient } from 'redis';
import BasicDBConnection from '../../infrastructure/contracts/BasicDBConnection';
import config from '@src/config';

class RedisConnection extends BasicDBConnection {
  public async makeConnection() {
    this.connection.on('error', (err) =>
      console.log('Redis Client Error', err),
    );
    await this.connection.connect();
    return true;
  }
}

const redisConnectionInstance = new RedisConnection(createClient(config.redis));
export { redisConnectionInstance, RedisConnection };
