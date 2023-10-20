import { validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';

class CasesController {
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
        lawyerId: {
          required: true,
          type: 'number',
        },
        clientId: {
          required: true,
          type: 'number',
        },
        budget: {
          required: true,
          type: 'number',
          minValue: 1,
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
        lawyerId: {
          required: false,
          type: 'number',
        },
        budget: {
          required: false,
          type: 'number',
          minValue: 1,
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

  fulfill(req, res, next) {
    try {
      return res.status(200).json({ result: {} });
    } catch (e) {
      return next(e);
    }
  }

  reject(req, res, next) {
    try {
      return res.status(200).json({ result: {} });
    } catch (e) {
      return next(e);
    }
  }

  admit(req, res, next) {
    try {
      return res.status(200).json({ result: {} });
    } catch (e) {
      return next(e);
    }
  }
}

export default new CasesController();
