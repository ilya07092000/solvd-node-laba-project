import { validateObject } from '@src/helpers/validation';
import RoleTypes from '@src/infrastructure/enums/roles';
import ValidationException from '@src/infrastructure/exceptions/validationException';

class LicensesController {
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
        lawyer_id: {
          required: true,
          type: 'number',
        },
        info: {
          required: true,
          type: 'string',
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
        lawyer_id: {
          required: false,
          type: 'number',
        },
        info: {
          required: false,
          type: 'string',
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

  verify(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        notes: {
          required: true,
          type: 'string',
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

  reject(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        notes: {
          required: true,
          type: 'string',
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
}

export default new LicensesController();
