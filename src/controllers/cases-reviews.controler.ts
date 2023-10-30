import { validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { casesReviewsService } from '@src/services/cases-reviews.service';

class CasesReviewsController {
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
        message: {
          required: true,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await casesReviewsService.createReview({
        userId: req.userInfo.id,
        caseId: req.params.id,
        data: body,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getCasesReviews(req, res, next) {
    try {
      const result = await casesReviewsService.getCasesReviews({
        caseId: req.params.id,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new CasesReviewsController();
