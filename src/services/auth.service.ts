import HttpException from '@src/infrastructure/exceptions/httpException';
import { tokenService, TokenService } from '@src/services/token.service';
import bcrypt from 'bcrypt';

class AuthService {
  private tokenService: TokenService;

  constructor(tokenService: TokenService) {
    this.tokenService = tokenService;
  }

  async registration(data) {
    const hashedPassword = await bcrypt.hash(
      data.password,
      +process.env.SALT_ROUNDS,
    );

    return {
      id: 1,
      ...data,
      password: hashedPassword,
    };
  }

  async login({ email, password }) {
    const isCorrectPassword = await bcrypt.compare(
      password,
      process.env.PASSWORD,
    );
    if (!isCorrectPassword) {
      throw new HttpException(400, 'Login or password is not correct');
    }

    const tokens = tokenService.generateTokens();
    await tokenService.saveToken({ userId: 1, token: tokens.accessToken });
    await tokenService.saveToken({ userId: 1, token: tokens.refreshToken });

    return {
      userId: 1,
      email,
      tokens: {
        access: tokens.accessToken.token,
        refresh: tokens.refreshToken.token,
      },
    };
  }

  async refresh({ refreshToken, accessToken }) {
    const refreshTokenInfo = await this.tokenService.validateToken({
      token: refreshToken,
      type: 'refresh',
    });
    const accessTokenInfo = await this.tokenService.validateToken({
      token: accessToken,
      type: 'access',
    });

    if (!refreshTokenInfo.isValid || !accessTokenInfo.isValid) {
      throw new HttpException(400, 'Refresh or access token is not valid');
    }

    await tokenService.deleteToken({ token: refreshToken });
    await tokenService.deleteToken({ token: accessToken });

    const tokens = tokenService.generateTokens();
    await tokenService.saveToken({ userId: 1, token: tokens.accessToken });
    await tokenService.saveToken({ userId: 1, token: tokens.refreshToken });

    return {
      userId: refreshTokenInfo.userId,
      tokens: {
        access: tokens.accessToken.token,
        refresh: tokens.refreshToken.token,
      },
    };
  }

  async logout({ refreshToken, accessToken }) {
    const refreshTokenInfo = await this.tokenService.validateToken({
      token: refreshToken,
      type: 'refresh',
    });
    const accessTokenInfo = await this.tokenService.validateToken({
      token: accessToken,
      type: 'access',
    });

    if (!refreshTokenInfo.isValid || !accessTokenInfo.isValid) {
      throw new HttpException(400, 'Refresh or access token is not valid');
    }

    await tokenService.deleteToken({ token: refreshToken });
    await tokenService.deleteToken({ token: accessToken });

    return;
  }
}

const authService = new AuthService(tokenService);
export default authService;
