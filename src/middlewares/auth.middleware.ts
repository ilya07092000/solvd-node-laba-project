import HttpException from '@src/infrastructure/exceptions/httpException';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { roleService } from '@src/services/role.service';
import { tokenService } from '@src/services/token.service';
import { userService } from '@src/services/user.service';

const authMiddleware =
  (roles: string[] = []) =>
  async (req, res, next) => {
    try {
      const token = req?.headers?.authorization?.split(' ')?.[1];
      if (!token) {
        next(new HttpException(401, 'Session does not exit!'));
        return;
      }

      const tokenInfo = await tokenService.validateToken({
        token,
        type: 'access',
        checkExpiration: true,
      });
      if (!tokenInfo?.isValid) {
        next(new HttpException(401, 'Session does not exit!'));
        return;
      }

      /**
       * Write information about user in request object
       * in order to use it further
       */
      const userInfo = await userService.getById({ id: tokenInfo.userId });
      const roleInfo = await roleService.getById({ id: userInfo.roleId });
      req.userInfo = userInfo;

      /**
       * CHECK WHETHER USER FIT ROLES REQUIREMENTS
       */
      if (roles.length) {
        if (!roles.includes(roleInfo.type)) {
          next(
            new HttpException(
              401,
              'You are not allowed to perform this action!',
            ),
          );
          return;
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  };

export default authMiddleware;
