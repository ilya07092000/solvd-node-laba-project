import { validateObject } from '@src/helpers/validation';
import HttpException from '@src/infrastructure/exceptions/httpException';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { clientService } from '@src/services/client.service';

class LawyersController {
  async getAll(req, res, next) {
    try {
      const result = await clientService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await clientService.getById({ id: req.params.id });
      if (!result) {
        throw new HttpException(404, 'Client was not found');
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
        budget: {
          required: false,
          type: 'number',
          minValue: 0,
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await clientService.create(body);

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        budget: {
          required: true,
          type: 'number',
          minValue: 0,
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await clientService.update({
        id: req.params.id,
        budget: body.budget,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const result = await clientService.deleteById({
        id: req.params.id,
        currUserId: req?.userInfo?.id || null,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new LawyersController();
