import { Router } from 'express';
const router = Router();

import casesController from '@src/controllers/cases.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';
import lawyerCasesController from '@src/controllers/lawyer-cases.controller';
import casesReviewsControler from '@src/controllers/cases-reviews.controler';
import casesConflictsController from '@src/controllers/cases-conflicts.controller';

/**
 * FOR AUTH USERS
 */
router.get('/', [authMiddleware([])], casesController.getAll);
router.get('/:id', [authMiddleware([])], casesController.getById);
router.get(
  '/:id/reviews',
  [authMiddleware([])],
  casesReviewsControler.getCasesReviews,
);
router.get(
  '/:id/conflicts',
  [authMiddleware([])],
  casesConflictsController.getAll,
);

/**
 * FOR CLIENTS
 */
router.post(
  '/:id/conflicts',
  [authMiddleware([RoleTypes.CLIENT])],
  casesConflictsController.create,
);

/**
 * FOR ADMINS
 */
router.post('/', [authMiddleware([RoleTypes.ADMIN])], casesController.create);
router.put('/:id', [authMiddleware([RoleTypes.ADMIN])], casesController.update);
router.delete(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  casesController.deleteById,
);

/**
 * FOR LAWYERS
 */
router.post(
  '/:id/fulfill',
  [authMiddleware([RoleTypes.LAWYER])],
  lawyerCasesController.fulfillCase,
);
router.post(
  '/:id/admit',
  [authMiddleware([RoleTypes.LAWYER])],
  lawyerCasesController.admitCase,
);
router.post(
  '/:id/reject',
  [authMiddleware([RoleTypes.LAWYER])],
  lawyerCasesController.rejectCase,
);

/**
 * FOR CLIENT AND LAWYER
 */
router.post(
  '/:id/reviews',
  [authMiddleware([RoleTypes.LAWYER, RoleTypes.CLIENT])],
  casesReviewsControler.create,
);

export default router;
