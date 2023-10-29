import HttpException from '@src/infrastructure/exceptions/httpException';
import { tokenService, TokenService } from '@src/services/token.service';
import { userService, UserService } from './user.service';
import { UserDto } from '@src/dto/user';
import RoleTypes from '@src/infrastructure/enums/roles';
import { LawyerService, lawyerService } from './lawyer.service';
import { CreateLawyerDto } from '@src/dto/lawyer';
import { postgresConnectionInstance } from '@src/db/postgres/connection';
import { roleService, RoleService } from './role.service';
import { clientService, ClientService } from './client.service';
import { CreateClientDto } from '@src/dto/client';
import { passwordService, PasswordService } from './password.service';

class AuthService {
  private tokenService: TokenService;
  private userService: UserService;
  private lawyerService: LawyerService;
  private roleService: RoleService;
  private clientService: ClientService;
  private passwordService: PasswordService;

  constructor(
    tokenService: TokenService,
    userService: UserService,
    lawyerService: LawyerService,
    roleService: RoleService,
    clientService: ClientService,
    passwordService: PasswordService,
  ) {
    this.tokenService = tokenService;
    this.userService = userService;
    this.lawyerService = lawyerService;
    this.roleService = roleService;
    this.clientService = clientService;
    this.passwordService = passwordService;
  }

  async registration(data: UserDto & { password: string }) {
    try {
      /**
       * check whether role id exists in roles table
       * exception: can not register admin role by registration process
       */
      const roleInfo = await this.roleService.getById({ id: data.roleId });
      if (!roleInfo || roleInfo.type === RoleTypes.ADMIN) {
        throw new HttpException(400, 'Role Does Not Exist');
      }

      /**
       * begin transaction
       */
      await postgresConnectionInstance.connection.query('BEGIN');

      const user = await this.userService.create(data);

      /**
       * depends on role type which we get by id from db,
       * create lawyer or client
       */
      if (roleInfo.type === RoleTypes.LAWYER) {
        await this.lawyerService.create(
          new CreateLawyerDto({ userId: user.id, available: false }),
        );
      } else if (roleInfo.type === RoleTypes.CLIENT) {
        await this.clientService.create(
          new CreateClientDto({ userId: user.id, budget: 1000 }),
        );
      }

      /**
       * commit transaction
       */
      await postgresConnectionInstance.connection.query('COMMIT');
      return user;
    } catch (e) {
      /**
       * rollback transaction in case of error
       */
      await postgresConnectionInstance.connection.query('ROLLBACK');
      throw e;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    /**
     * check whether user by this email exists in db
     */
    const userInfo = await this.userService.getByEmail({ email });
    if (!userInfo) {
      throw new HttpException(400, 'Email or password is not correct');
    }
    const userDto = userInfo.dto;

    /**
     * comparre password in passowrd service
     */
    const isCorrectPassword = await this.passwordService.checkPassword({
      password,
      hash: userInfo.password,
    });
    if (!isCorrectPassword) {
      throw new HttpException(400, 'Email or password is not correct');
    }

    /**
     * generate access and refresh token
     * save them in db
     */
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
    /**
     * validate both access and refresh token
     * exception - access token can be expired, so we do not validate expiration timestamp
     */
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

    /**
     * delete tokens if they are valid
     */
    await tokenService.deleteToken({ token: refreshToken });
    await tokenService.deleteToken({ token: accessToken });

    /**
     * generate new pair of tokens,
     * save them in db
     */
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
    /**
     * check whether tokens are valid
     * exception - access token can be expired, so we do not validate expiration timestamp
     */
    const refreshTokenInfo = await this.tokenService.validateToken({
      token: refreshToken,
      type: 'refresh',
    });
    const accessTokenInfo = await this.tokenService.validateToken({
      token: accessToken,
      type: 'access',
      checkExpiration: false /** for logout access token can be expired */,
    });
    if (!refreshTokenInfo.isValid || !accessTokenInfo.isValid) {
      throw new HttpException(400, 'Refresh or access token is not valid');
    }

    /**
     * delete tokens if they are valid
     */
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
  passwordService,
);
export { authService, AuthService };
