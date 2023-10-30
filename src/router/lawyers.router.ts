import { Router } from 'express';
const router = Router();

import lawyersController from '@src/controllers/lawyers.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';
import lawyerLicenseController from '@src/controllers/lawyer-license.controller';
import lawyerCasesController from '@src/controllers/lawyer-cases.controller';

/**
 * AUTH
 */
router.get('/', [authMiddleware([])], lawyersController.getAll);
router.get('/:id', [authMiddleware([])], lawyersController.getById);
router.get(
  '/:id/licenses',
  [authMiddleware([])],
  lawyerLicenseController.getAllLicenses,
);
router.get(
  '/:id/cases',
  [authMiddleware([])],
  lawyerCasesController.getAllCases,
);

/**
 * ADMIN
 */
router.post('/', [authMiddleware([RoleTypes.ADMIN])], lawyersController.create);
router.put(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  lawyersController.update,
);
router.delete(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  lawyersController.deleteById,
);

/**
 * lawyer
 */
router.use(authMiddleware([RoleTypes.LAWYER]));
router.post('/licenses', lawyerLicenseController.addLicense);

export default router;
