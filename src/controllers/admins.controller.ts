import { validateObject } from '@src/helpers/validation';
import HttpException from '@src/infrastructure/exceptions/httpException';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { adminService } from '@src/services/admin.service';

class AdminsController {
  async getAll(req, res, next) {
    try {
      const result = await adminService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await adminService.getById({ id: req.params.id });
      if (!result) {
        throw new HttpException(404, 'Admin was not found');
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
        userId: {
          type: 'number',
          required: true,
          minValue: 0,
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await adminService.create(body);

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        isActive: {
          required: true,
          type: 'boolean',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await adminService.update({
        id: req.params.id,
        isActive: body.isActive,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const result = await adminService.deleteById({
        id: req.params.id,
        currUserId: req?.userInfo?.id || null,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new AdminsController();
