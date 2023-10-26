import { Router } from 'express';
const router = Router();

import usersController from '@src/controllers/users.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';

router.use(authMiddleware([RoleTypes.ADMIN]));
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.deleteById);

export default router;
