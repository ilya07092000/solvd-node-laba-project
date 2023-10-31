import { validateObject } from '@src/helpers/validation';
import ConflictStatuses from '@src/infrastructure/enums/conflictStatuses';
import HttpException from '@src/infrastructure/exceptions/httpException';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { casesConflictsService } from '@src/services/cases-conflicts';

class CasesConflictsController {
  async create(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        reason: {
          required: true,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }
      const result = await casesConflictsService.createConflict(
        req.userInfo.id,
        { ...body, caseId: req.params.id },
      );

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await casesConflictsService.getCaseConflicts({
        caseId: req.params.id,
      });

      return res.status(201).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new CasesConflictsController();
