import { Router } from 'express';
const router = Router();

import verificationController from '@src/controllers/verification.controller';
import authMiddleware from '@src/middlewares/auth.middleware';
import RoleTypes from '@src/infrastructure/enums/roles';

router.use(authMiddleware([RoleTypes.ADMIN]));
router.get('/', verificationController.getAll);
router.get('/:id', verificationController.getById);
router.post('/', verificationController.create);
router.put('/:id', verificationController.update);
router.delete('/:id', verificationController.deleteById);

export default router;
