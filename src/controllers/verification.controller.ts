import { validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import HttpException from '@src/infrastructure/exceptions/httpException';
import { verificationService } from '@src/services/verification.service';
import VerificationStatuses from '@src/infrastructure/enums/verificationStatuses';

class VerificationController {
  async getAll(req, res, next) {
    try {
      const result = await verificationService.getAll();
      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await verificationService.getById({ id: req.params.id });
      if (!result) {
        throw new HttpException(404, 'Verification was not found');
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
        verifierId: {
          required: true,
          type: 'number',
        },
        notes: {
          required: true,
          type: 'string',
        },
        status: {
          required: true,
          type: 'string',
          includes: [
            VerificationStatuses.REJECTED,
            VerificationStatuses.VERIFIED,
          ],
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await verificationService.create(body);

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        verifierId: {
          required: false,
          type: 'number',
        },
        notes: {
          required: false,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await verificationService.update({
        id: req.params.id,
        verificationInfo: body,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async deleteById(req, res, next) {
    try {
      const result = await verificationService.deleteById({
        id: req.params.id,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new VerificationController();
