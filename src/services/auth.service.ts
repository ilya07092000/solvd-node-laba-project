import HttpException from '@src/infrastructure/exceptions/httpException';
import { tokenService, TokenService } from '@src/services/token.service';
import { userService, UserService } from './user.service';
import bcrypt from 'bcrypt';
import { CreateUserDto, UserDto } from '@src/dto/user';

class AuthService {
  private tokenService: TokenService;
  private userService: UserService;

  constructor(tokenService: TokenService, userService: UserService) {
    this.tokenService = tokenService;
    this.userService = userService;
  }

  async registration(data: UserDto & { password: string }) {
    const hashedPassword = await bcrypt.hash(
      data.password,
      +process.env.SALT_ROUNDS,
    );
    const user = await this.userService.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async login({ email, password }: { email: string; password: string }) {
    const userInfo = await this.userService.getByEmail({ email });
    const userDto = userInfo.dto;

    if (!userDto.id) {
      throw new HttpException(400, 'Email or password is not correct');
    }

    const isCorrectPassword = await bcrypt.compare(password, userInfo.password);
    if (!isCorrectPassword) {
      throw new HttpException(400, 'Email or password is not correct');
    }

    const tokens = tokenService.generateTokens();
    await tokenService.saveToken({
      userId: userDto.id,
      token: tokens.accessToken,
    });
    await tokenService.saveToken({
      userId: userDto.id,
      token: tokens.refreshToken,
    });

    return {
      ...userInfo.dto,
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
      checkExpiration: false /** for refreshing access token can be expired */,
    });

    if (!refreshTokenInfo.isValid || !accessTokenInfo.isValid) {
      throw new HttpException(400, 'Refresh or access token is not valid');
    }

    await tokenService.deleteToken({ token: refreshToken });
    await tokenService.deleteToken({ token: accessToken });

    const tokens = tokenService.generateTokens();
    await tokenService.saveToken({
      userId: accessTokenInfo.userId,
      token: tokens.accessToken,
    });
    await tokenService.saveToken({
      userId: accessTokenInfo.userId,
      token: tokens.refreshToken,
    });

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

const authService = new AuthService(tokenService, userService);
export default authService;
