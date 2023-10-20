import { validateObject } from '@src/helpers/validation';
import RoleTypes from '@src/infrastructure/enums/roles';
import ValidationException from '@src/infrastructure/exceptions/validationException';

class ReviewsController {
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
        caseId: {
          required: true,
          type: 'number',
        },
        rate: {
          required: true,
          type: 'number',
          minValue: 1,
          maxValue: 5,
        },
        creator: {
          required: true,
          type: 'string',
          includes: [RoleTypes.LAWYER, RoleTypes.CLIENT],
        },
        message: {
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
        caseId: {
          required: false,
          type: 'number',
        },
        rate: {
          required: false,
          type: 'number',
          minValue: 0,
          maxValue: 5,
        },
        creator: {
          required: false,
          type: 'string',
          includes: [RoleTypes.LAWYER, RoleTypes.CLIENT],
        },
        message: {
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
}

export default new ReviewsController();
