import { validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';

class LawyersController {
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
          includes: ['lawyer'],
        },
        city: {
          required: true,
          type: 'string',
        },
        occupation: {
          required: false,
          type: 'string',
        },
        price: {
          required: false,
          type: 'number',
          minValue: 0,
        },
        experience: {
          required: false,
          type: 'string',
        },
        available: {
          required: false,
          type: 'boolean',
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
        email: {
          required: false,
          type: 'email',
        },
        password: {
          type: 'string',
          required: false,
          minLength: 6,
        },
        firstName: {
          type: 'string',
          required: false,
        },
        lastName: {
          type: 'string',
          required: false,
        },
        role: {
          required: false,
          type: 'string',
          includes: ['client', 'lawyer'],
        },
        city: {
          required: false,
          type: 'string',
        },
        occupation: {
          required: false,
          type: 'string',
        },
        price: {
          required: false,
          type: 'number',
          minValue: 1,
        },
        experience: {
          required: false,
          type: 'string',
        },
        available: {
          required: false,
          type: 'boolean',
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

export default new LawyersController();
