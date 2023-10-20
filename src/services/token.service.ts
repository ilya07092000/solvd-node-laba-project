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
      active: 1,
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
      active: 1,
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

  public getTokenInfo({ token }: { token: string }) {
    return this.repository.get({ token });
  }

  public deleteToken({ token }: { token: string }) {
    return this.repository.delete({ token });
  }

  public async validateToken({
    token,
    type,
    checkExpiration = true,
  }: {
    token: string;
    type: IToken['type'];
    checkExpiration?: boolean;
  }): Promise<IToken & { isValid: boolean; userId: number }> {
    const tokenInfo = await this.repository.get({ token: token });
    let isValid =
      tokenInfo && +tokenInfo.active === 1 && tokenInfo.type === type;

    if (checkExpiration && isValid) {
      isValid = tokenInfo.expirationTimeStamp > +Date.now();
    }

    return {
      isValid,
      ...tokenInfo,
    };
  }
}

const tokenService = new TokenService(tokenRepository);
export { TokenService, tokenService };
