import { Router } from 'express';
const router = Router();

import adminsController from '@src/controllers/admins.controller';

router.get('/', adminsController.getAll);
router.get('/:id', adminsController.getById);
router.post('/', adminsController.create);
router.put('/:id', adminsController.update);
router.delete('/:id', adminsController.deleteById);

export default router;
