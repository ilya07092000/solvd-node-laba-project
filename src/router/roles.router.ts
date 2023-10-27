import { Router } from 'express';
const router = Router();

import rolesController from '@src/controllers/roles.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';

router.get('/', rolesController.getAll);
router.get('/:id', rolesController.getById);

/**
 * PRIVATE
 */
router.use(authMiddleware([RoleTypes.ADMIN]));
router.post('/', rolesController.create);
router.put('/:id', rolesController.update);
router.delete('/:id', rolesController.deleteById);

export default router;
