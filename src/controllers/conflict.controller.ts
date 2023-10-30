import { validateObject } from '@src/helpers/validation';
import ConflictStatuses from '@src/infrastructure/enums/conflictStatuses';
import HttpException from '@src/infrastructure/exceptions/httpException';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { conflictService } from '@src/services/conflict.service';

class ConflictController {
  async getAll(req, res, next) {
    try {
      const result = await conflictService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await conflictService.getById({ id: req.params.id });
      if (!result) {
        throw new HttpException(404, 'Conflict was not found!');
      }
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        caseId: {
          required: true,
          type: 'number',
        },
        reason: {
          required: true,
          type: 'string',
        },
        status: {
          required: false,
          type: 'string',
          includes: [...Object.values(ConflictStatuses)],
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }
      const result = await conflictService.create(body);

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        caseId: {
          required: false,
          type: 'number',
        },
        reason: {
          required: false,
          type: 'string',
        },
        status: {
          required: false,
          type: 'string',
          includes: [...Object.values(ConflictStatuses)],
        },
        adminId: {
          required: false,
          type: 'number',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }
      const result = await conflictService.update({
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
      const result = await conflictService.deleteById({ id: req.params.id });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async fulfill(req, res, next) {
    try {
      const result = await conflictService.fulfill({ id: req.params.id });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async reject(req, res, next) {
    try {
      const result = await conflictService.reject({ id: req.params.id });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new ConflictController();
