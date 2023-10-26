import BasicDBConnection from '../../infrastructure/contracts/BasicDBConnection';
import config from '@src/config';
const { Pool } = require('pg');

class PostgresConnection extends BasicDBConnection {
  public async makeConnection() {
    await this.connection.connect();
    console.log('Postgres Connected');
  }
}

const postgresConnectionInstance = new PostgresConnection(
  new Pool(config.postgres),
);
export { postgresConnectionInstance, PostgresConnection };
