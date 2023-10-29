import { validateObject } from '@src/helpers/validation';
import RoleTypes from '@src/infrastructure/enums/roles';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { reviewService } from '@src/services/review.service';

class ReviewsController {
  async getAll(req, res, next) {
    try {
      const result = await reviewService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await reviewService.getById({ id: req.params.id });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
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

      const result = await reviewService.create(body);
      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        rate: {
          required: false,
          type: 'number',
          minValue: 1,
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
      const result = await reviewService.update({
        id: req.params.id,
        reviewInfo: body,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const result = await reviewService.deleteById({ id: req.params.id });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new ReviewsController();
