import { checkMandatoryFields } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import authService from '@src/services/auth.service';

class AuthController {
  async registration(req, res, next) {
    try {
      const body = req.body;
      const mandatoryFields = checkMandatoryFields({
        fields: ['firstName', 'lastName', 'email', 'password', 'role', 'city'],
        obj: body,
      });

      if (mandatoryFields.length) {
        throw new ValidationException(
          400,
          `${mandatoryFields.join(',')} fields are required`,
        );
      }

      const result = await authService.registration(body);
      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async login(req, res, next) {
    try {
      const body = req.body;
      const mandatoryFields = checkMandatoryFields({
        fields: ['email', 'password'],
        obj: body,
      });

      if (mandatoryFields.length) {
        throw new ValidationException(
          400,
          `${mandatoryFields.join(',')} fields are required`,
        );
      }

      const result = await authService.login({
        email: body.email,
        password: body.password,
      });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const body = req.body;
      const mandatoryFields = checkMandatoryFields({
        fields: ['refreshToken', 'accessToken'],
        obj: body,
      });

      if (mandatoryFields.length) {
        throw new ValidationException(
          400,
          `${mandatoryFields.join(',')} fields are required`,
        );
      }

      const result = await authService.refresh({
        refreshToken: body.refreshToken,
        accessToken: body.accessToken,
      });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const body = req.body;
      const mandatoryFields = checkMandatoryFields({
        fields: ['refreshToken', 'accessToken'],
        obj: body,
      });

      if (mandatoryFields.length) {
        throw new ValidationException(
          400,
          `${mandatoryFields.join(',')} fields are required`,
        );
      }

      await authService.logout({
        refreshToken: body.refreshToken,
        accessToken: body.accessToken,
      });

      return res.status(200).end();
    } catch (e) {
      return next(e);
    }
  }
}

export default new AuthController();
