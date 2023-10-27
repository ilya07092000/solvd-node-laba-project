import { validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { lawyerService } from '@src/services/lawyer.service';

class LawyersController {
  async getAll(req, res, next) {
    try {
      const result = await lawyerService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await lawyerService.getById({ id: req.params.id });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        userId: {
          required: true,
          type: 'number',
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

      const result = await lawyerService.create(body);
      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        userId: {
          required: false,
          type: 'number',
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

      const result = await lawyerService.update({
        id: req.params.id,
        data: body,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const id = req.params.id;
      const result = await lawyerService.deleteById({
        id: +id,
        currUserId: req?.userInfo?.id || null,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new LawyersController();
