import { Router } from 'express';
const router = Router();

import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';
import conflictController from '@src/controllers/conflict.controller';

/**
 * FOR AUTH USERS
 */
router.get('/', [authMiddleware([])], conflictController.getAll);
router.get('/:id', [authMiddleware([])], conflictController.getById);

/**
 * ONLY FOR ADMINS
 */
router.post(
  '/',
  [authMiddleware([RoleTypes.ADMIN])],
  conflictController.create,
);
router.put(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  conflictController.update,
);
router.delete(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  conflictController.deleteById,
);
router.post(
  '/:id/fulfill',
  [authMiddleware([RoleTypes.ADMIN])],
  conflictController.fulfill,
);
router.post(
  '/:id/reject',
  [authMiddleware([RoleTypes.ADMIN])],
  conflictController.reject,
);

export default router;
