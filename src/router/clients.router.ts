import { Router } from 'express';
const router = Router();

import clientsController from '@src/controllers/clients.controller';
import clientCasesController from '@src/controllers/client-cases.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';

/**
 * FOR AUTH USERS
 */
router.get('/', [authMiddleware([])], clientsController.getAll);
router.get('/:id', [authMiddleware([])], clientsController.getById);

/**
 * FOR ADMIN
 */
router.post('/', [authMiddleware([RoleTypes.ADMIN])], clientsController.create);
router.put(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  clientsController.update,
);
router.delete(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  clientsController.deleteById,
);

/**
 * ONLY FOR CLIENTS
 */
router.post(
  '/cases',
  [authMiddleware([RoleTypes.CLIENT])],
  clientCasesController.createCase,
);
router.get(
  '/:id/cases',
  [authMiddleware([RoleTypes.CLIENT])],
  clientCasesController.getAllCases,
);

export default router;
