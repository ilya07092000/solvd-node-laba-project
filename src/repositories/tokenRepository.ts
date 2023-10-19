import { redisConnectionInstance } from '@src/db/redis/connection';
import IToken from '@src/infrastructure/interfaces/IToken';

class TokenRepository {
  private connection;

  constructor(connection) {
    this.connection = connection;
  }

  save({ token, userId }: { token: IToken; userId: number }) {
    const { token: key, ...tokenInfo } = token;
    return this.connection.hSet(key, { ...tokenInfo, userId });
  }

  get({ token }: { token: string }): Promise<IToken & { userId: number }> {
    return this.connection.hGetAll(token);
  }

  async delete({ token }: { token: string }): Promise<void> {
    await this.connection.hIncrBy(token, 'active', -1);
    return;
  }
}

const tokenRepository = new TokenRepository(redisConnectionInstance.connection);
export { TokenRepository, tokenRepository };
