import { Router } from 'express';
const router = Router();

import usersController from '@src/controllers/users.controller';
import authMiddleware from '@src/middlewares/auth.middleware';

router.use(authMiddleware([]));
router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.deleteById);

export default router;
