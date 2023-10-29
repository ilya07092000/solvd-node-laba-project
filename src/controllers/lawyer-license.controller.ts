import { validateObject } from '@src/helpers/validation';
import ValidationException from '@src/infrastructure/exceptions/validationException';
import { lawyerLicenseService } from '@src/services/lawyer-license.service';

class LawyerLicenseController {
  async addLicense(req, res, next) {
    try {
      const body = req.body;
      const errors = validateObject(body, {
        info: {
          required: true,
          type: 'string',
        },
      });

      if (errors.length) {
        throw new ValidationException(400, JSON.stringify(errors));
      }

      const result = await lawyerLicenseService.addLicense({
        userId: req.userInfo.id,
        info: body.info,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }

  async getAllLicenses(req, res, next) {
    try {
      const result = await lawyerLicenseService.getAllLicenses({
        lawyerId: req.params.id,
      });

      return res.status(200).json({ result });
    } catch (e) {
      return next(e);
    }
  }
}

export default new LawyerLicenseController();
