import { validateObject } from '@src/helpers/validation';
import RoleTypes from '@src/infrastructure/enums/roles';
import ValidationException from '@src/infrastructure/exceptions/validationException';

class RolesController {
  getAll(req, res, next) {
    try {
      return res.status(200).json({ result: [] });
    } catch (e) {
      return next(e);
    }
  }

  getById(req, res, next) {
    try {
      return res.status(200).json({ result: {} });
    } catch (e) {
      return next(e);
    }
  }

  create(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        type: {
          required: true,
          type: 'string',
          includes: [RoleTypes.ADMIN, RoleTypes.CLIENT, RoleTypes.LAWYER],
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      return res.status(201).json({ result: {} });
    } catch (e) {
      return next(e);
    }
  }

  update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        type: {
          required: false,
          type: 'string',
          includes: [RoleTypes.ADMIN, RoleTypes.CLIENT, RoleTypes.LAWYER],
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      return res.status(200).json({ result: {} });
    } catch (e) {
      return next(e);
    }
  }

  deleteById(req, res, next) {
    try {
      return res.status(200).json({ result: {} });
    } catch (e) {
      return next(e);
    }
  }
}

export default new RolesController();
