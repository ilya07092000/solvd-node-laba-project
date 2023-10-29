import { validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { clientCasesService } from '@src/services/client-cases.service';

class ClientCasesController {
  async createCase(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        lawyerId: {
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
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await clientCasesService.createCase(req.userInfo.id, body);

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getAllCases(req, res, next) {
    try {
      const result = await clientCasesService.getClientCases({
        clientId: req.params.id,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new ClientCasesController();
