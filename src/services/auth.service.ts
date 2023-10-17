import HttpException from '@src/infrastructure/exceptions/httpException';
import { tokenService, TokenService } from '@src/services/token.service';
import bcrypt from 'bcrypt';

class AuthService {
  private tokenService: TokenService;

  constructor(tokenService) {
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

  async login({ login, password }) {
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
      login,
      tokens: {
        access: tokens.accessToken.token,
        refresh: tokens.refreshToken.token,
      },
    };
  }

  async refresh({ refreshToken }) {
    const tokenInfo = await this.tokenService.validateRefreshToken({
      refreshToken,
    });

    if (!tokenInfo.isValid || !tokenInfo.token) {
      throw new HttpException(400, 'Token is not valid');
    }

    const tokens = tokenService.generateTokens();
    await tokenService.saveToken({ userId: 1, token: tokens.accessToken });
    await tokenService.saveToken({ userId: 1, token: tokens.refreshToken });

    return {
      userId: tokenInfo.token.userId,
      tokens: {
        access: tokens.accessToken.token,
        refresh: tokens.refreshToken.token,
      },
    };
  }
}

const authService = new AuthService(tokenService);
export default authService;
