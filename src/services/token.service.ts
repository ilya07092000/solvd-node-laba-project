import { getFutureTimestampByMinutes } from '@src/helpers/timestamps';
import HttpException from '@src/infrastructure/exceptions/httpException';
import IToken from '@src/infrastructure/interfaces/IToken';
import {
  TokenRepository,
  tokenRepository,
} from '@src/repositories/tokenRepository';

class TokenService {
  private repository: TokenRepository;

  constructor(repository: TokenRepository) {
    this.repository = repository;
  }

  private getToken(): string {
    return (
      Date.now() -
      Math.floor(Math.random() * 100) +
      Math.floor(Math.random() * 200)
    ).toString();
  }

  public getAccessToken(): IToken {
    const expirationTimeStamp = getFutureTimestampByMinutes(
      +process.env.ACCESS_TOKEN_EXPIRATION_MINUTES,
    );
    return {
      type: 'access',
      token: this.getToken(),
      expirationTimeStamp,
    };
  }

  public getRefreshToken(): IToken {
    const expirationTimeStamp = getFutureTimestampByMinutes(
      +process.env.REFRESH_TOKEN_EXPIRATION_MINUTES,
    );
    return {
      type: 'refresh',
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
    return this.repository.save({ token, userId });
  }

  public async validateRefreshToken({ refreshToken }): Promise<{
    token: IToken & { userId: number };
    isValid: boolean;
  }> {
    const token = await this.repository.get({ token: refreshToken });
    return {
      token,
      isValid:
        +token.expirationTimeStamp > +Date.now() || token.type === 'refresh',
    };
  }

  // public async refreshTokens({ refreshToken }) {
  //   const token = await this.repository.get({ token: refreshToken });

  //   if (+token.expirationTimeStamp < +Date.now() || token.type !== 'refresh') {
  //     throw new HttpException(400, 'Token is not valid');
  //   }
  //   const tokens = this.generateTokens();
  //   await this.saveToken({ userId: token.userId, token: tokens.refreshToken });
  //   await this.saveToken({ userId: token.userId, token: tokens.accessToken });

  //   return tokens;
  // }
}

const tokenService = new TokenService(tokenRepository);
export { TokenService, tokenService };
