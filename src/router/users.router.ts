import { Router } from 'express';
const router = Router();

import usersController from '@src/controllers/users.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';

/**
 * FOR AUTH USERS
 */
router.get('/', [authMiddleware([])], usersController.getAll);
router.get('/:id', [authMiddleware([])], usersController.getById);

/**
 * ONLY FOR ADMINS
 */
router.post('/', [authMiddleware([RoleTypes.ADMIN])], usersController.create);
router.put('/:id', [authMiddleware([RoleTypes.ADMIN])], usersController.update);
router.delete(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  usersController.deleteById,
);

export default router;
