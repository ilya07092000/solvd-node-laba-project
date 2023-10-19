import { checkMandatoryFields, validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import authService from '@src/services/auth.service';

class AuthController {
  async registration(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        email: {
          required: true,
          type: 'email',
        },
        password: {
          type: 'string',
          required: true,
          minLength: 6,
        },
        firstName: {
          type: 'string',
          required: true,
        },
        lastName: {
          type: 'string',
          required: true,
        },
        role: {
          required: true,
          type: 'string',
          includes: ['client', 'lawyer'],
        },
        city: {
          required: true,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
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

      const errors = validateObject(body, {
        email: {
          required: true,
          type: 'email',
        },
        password: {
          type: 'string',
          required: true,
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
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
      const errors = validateObject(body, {
        refreshToken: {
          required: true,
          type: 'string',
        },
        accessToken: {
          type: 'string',
          required: true,
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
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
      const errors = validateObject(body, {
        refreshToken: {
          required: true,
          type: 'string',
        },
        accessToken: {
          type: 'string',
          required: true,
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
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
