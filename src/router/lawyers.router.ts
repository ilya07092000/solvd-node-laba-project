import { Router } from 'express';
const router = Router();

import lawyersController from '@src/controllers/lawyers.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';
import lawyerLicenseController from '@src/controllers/lawyer-license.controller';

router.use(authMiddleware([]));

router.get('/', lawyersController.getAll);
router.get('/:id', lawyersController.getById);
router.post('/', lawyersController.create);
router.put('/:id', lawyersController.update);
router.delete('/:id', lawyersController.deleteById);
router.get('/:id/licenses', lawyerLicenseController.getAllLicenses);

router.use(authMiddleware([RoleTypes.LAWYER]));
router.post('/licenses', lawyerLicenseController.addLicense);

export default router;
