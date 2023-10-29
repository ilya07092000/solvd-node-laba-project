import { Router } from 'express';
const router = Router();

import licensesController from '@src/controllers/licenses.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';

router.get('/', [authMiddleware([])], licensesController.getAll);
router.get('/:id', [authMiddleware([])], licensesController.getById);

router.post(
  '/',
  [authMiddleware([RoleTypes.ADMIN])],
  licensesController.create,
);
router.put(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  licensesController.update,
);
router.delete(
  '/:id',
  [authMiddleware([RoleTypes.ADMIN])],
  licensesController.deleteById,
);
router.put(
  '/:id/verify',
  [authMiddleware([RoleTypes.ADMIN])],
  licensesController.verify,
);
router.put(
  '/:id/reject',
  [authMiddleware([RoleTypes.ADMIN])],
  licensesController.reject,
);

export default router;
