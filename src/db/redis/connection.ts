import { createClient } from 'redis';
import BasicDBConnection from '../../infrastructure/contracts/BasicDBConnection';

class RedisConnection extends BasicDBConnection {
  public async makeConnection() {
    this.connection.on('error', (err) =>
      console.log('Redis Client Error', err),
    );
    await this.connection.connect();
    return true;
  }
}

const redisConnectionInstance = new RedisConnection(createClient());
export { redisConnectionInstance, RedisConnection };
