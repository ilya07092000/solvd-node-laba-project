import { Router } from 'express';
const router = Router();

import usersController from '@src/controllers/users.controller';

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.post('/', usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.deleteById);

export default router;
