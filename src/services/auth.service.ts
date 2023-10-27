import HttpException from '@src/infrastructure/exceptions/httpException';
import { tokenService, TokenService } from '@src/services/token.service';
import { userService, UserService } from './user.service';
import bcrypt from 'bcrypt';
import { UserDto } from '@src/dto/user';
import RoleTypes from '@src/infrastructure/enums/roles';
import { LawyerService, lawyerService } from './lawyer.service';
import { CreateLawyerDto } from '@src/dto/lawyer';
import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { roleService, RoleService } from './role.service';
import { clientService, ClientService } from './client.service';
import { CreateClientDto } from '@src/dto/client';

class AuthService {
  private tokenService: TokenService;
  private userService: UserService;
  private lawyerService: LawyerService;
  private roleService: RoleService;
  private clientService: ClientService;

  constructor(
    tokenService: TokenService,
    userService: UserService,
    lawyerService: LawyerService,
    roleService: RoleService,
    clientService: ClientService,
  ) {
    this.tokenService = tokenService;
    this.userService = userService;
    this.lawyerService = lawyerService;
    this.roleService = roleService;
    this.clientService = clientService;
  }

  async getHashedPassword({ password }: { password: string }): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.SALT_ROUNDS,
    );
    return hashedPassword;
  }

  async registration(data: UserDto & { password: string }) {
    try {
      const hashedPassword = await this.getHashedPassword({
        password: data.password,
      });
      const roleInfo = await this.roleService.getById({ id: data.roleId });
      if (!roleInfo || roleInfo.type === RoleTypes.ADMIN) {
        throw new HttpException(400, 'Role Does Not Exist');
      }

      await postgresConnectionInstance.connection.query('BEGIN');

      const user = await this.userService.create({
        ...data,
        password: hashedPassword,
      });

      if (roleInfo.type === RoleTypes.LAWYER) {
        await this.lawyerService.create(
          new CreateLawyerDto({ userId: user.id, available: false }),
        );
      } else if (roleInfo.type === RoleTypes.CLIENT) {
        await this.clientService.create(
          new CreateClientDto({ userId: user.id, budget: 0 }),
        );
      }

      await postgresConnectionInstance.connection.query('COMMIT');
      return user;
    } catch (e) {
      await postgresConnectionInstance.connection.query('ROLLBACK');
      throw e;
    }
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

const authService = new AuthService(
  tokenService,
  userService,
  lawyerService,
  roleService,
  clientService,
);
export { authService, AuthService };
