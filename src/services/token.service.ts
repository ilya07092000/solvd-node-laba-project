import { getFutureTimestampByMinutes } from '@src/helpers/timestamps';
import HttpException from '@src/infrastructure/exceptions/httpException';
import IToken from '@src/infrastructure/interfaces/IToken';
import tokenRepository from '@src/repositories/tokenRepository';

class TokenService {
  private repository;

  constructor(repository) {
    this.repository = repository;
  }

  private getToken(): number {
    return (
      Date.now() -
      Math.floor(Math.random() * 100) +
      Math.floor(Math.random() * 200)
    );
  }

  public getAccessToken(): IToken {
    const expirationTimeStamp = getFutureTimestampByMinutes(
      +process.env.ACCESS_TOKEN_EXPIRATION_MINUTES,
    );
    return {
      token: this.getToken(),
      expirationTimeStamp,
    };
  }

  public getRefreshToken(): IToken {
    const expirationTimeStamp = getFutureTimestampByMinutes(
      +process.env.REFRESH_TOKEN_EXPIRATION_MINUTES,
    );
    return {
      token: this.getToken(),
      expirationTimeStamp,
    };
  }

  public generateTokens(): { accessToken: IToken; refreshToken: IToken } {
    return {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
  }

  public saveToken({ userId, token }: { userId: number; token: IToken }) {
    return this.repository.save({
      token: token.token,
      tokenInfo: { expirationTimeStamp: token.expirationTimeStamp, userId },
    });
  }
}

const tokenService = new TokenService(tokenRepository);
export { TokenService, tokenService };
