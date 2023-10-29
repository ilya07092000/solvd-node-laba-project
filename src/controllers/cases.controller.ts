import { validateObject } from '@src/helpers/validation';
import CaseStatuses from '@src/infrastructure/enums/caseStatuses';
import HttpException from '@src/infrastructure/exceptions/httpException';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { caseService } from '@src/services/case.service';

class CasesController {
  async getAll(req, res, next) {
    try {
      const result = await caseService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await caseService.getById({ id: req.params.id });
      if (!result) {
        throw new HttpException(404, 'Case was not found!');
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
        description: {
          required: true,
          type: 'string',
        },
        status: {
          required: false,
          type: 'string',
          includes: [...Object.values(CaseStatuses)],
        },
        startDate: {
          required: false,
          type: 'string',
        },
        endDate: {
          required: false,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }
      const result = await caseService.create({
        status: CaseStatuses.CREATING,
        startDate: new Date(),
        ...body,
      });

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        lawyerId: {
          required: false,
          type: 'number',
        },
        clientId: {
          required: false,
          type: 'number',
        },
        budget: {
          required: false,
          type: 'number',
          minValue: 1,
        },
        description: {
          required: false,
          type: 'string',
        },
        status: {
          required: false,
          type: 'string',
          includes: [...Object.values(CaseStatuses)],
        },
        startDate: {
          required: false,
          type: 'string',
        },
        endDate: {
          required: false,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }
      const result = await caseService.update({
        id: req.params.id,
        caseInfo: body,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const result = await caseService.deleteById({ id: req.params.id });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new CasesController();
