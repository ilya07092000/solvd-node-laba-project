import { lawyerCasesService } from '@src/services/lawyer-cases.service';

class LawyerCasesController {
  async admitCase(req, res, next) {
    try {
      const result = await lawyerCasesService.admitCase(
        req.userInfo.id,
        req.params.id,
      );

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async rejectCase(req, res, next) {
    try {
      const result = await lawyerCasesService.rejectCase(
        req.userInfo.id,
        req.params.id,
      );

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async fulfillCase(req, res, next) {
    try {
      const result = await lawyerCasesService.fulfillCase(
        req.userInfo.id,
        req.params.id,
      );

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getAllCases(req, res, next) {
    try {
      const result = await lawyerCasesService.getLawyerCases({
        lawyerId: req.params.id,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new LawyerCasesController();
