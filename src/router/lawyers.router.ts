import { Router } from 'express';
const router = Router();

import lawyersController from '@src/controllers/lawyers.controller';

router.get('/', lawyersController.getAll);
router.get('/:id', lawyersController.getById);
router.post('/', lawyersController.create);
router.put('/:id', lawyersController.update);
router.delete('/:id', lawyersController.deleteById);

export default router;
