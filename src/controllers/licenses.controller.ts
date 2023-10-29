import { validateObject } from '@src/helpers/validation';
import { licenseService } from '@src/services/license.service';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import HttpException from '@src/infrastructure/exceptions/httpException';

class LicensesController {
  async getAll(req, res, next) {
    try {
      const result = await licenseService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await licenseService.getById({ id: req.params.id });
      if (!result) {
        throw new HttpException(404, 'License was not found');
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
        info: {
          required: true,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await licenseService.create(body);

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
        info: {
          required: false,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await licenseService.update({
        id: req.params.id,
        licenseInfo: body,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const result = await licenseService.deleteById({
        id: req.params.id,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async verify(req, res, next) {
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

      const result = await licenseService.verify({
        id: req.params.id,
        adminId: req?.userInfo?.id,
        notes: body.notes,
      });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async reject(req, res, next) {
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

      const result = await licenseService.reject({
        id: req.params.id,
        adminId: req?.userInfo?.id,
        notes: body.notes,
      });
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new LicensesController();
