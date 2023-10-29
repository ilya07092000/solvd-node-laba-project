import { Router } from 'express';
const router = Router();

import casesController from '@src/controllers/cases.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';

/**
 * FOR AUTH USERS
 */
router.get('/', [authMiddleware([])], casesController.getAll);
router.get('/:id', [authMiddleware([])], casesController.getById);

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

export default router;
