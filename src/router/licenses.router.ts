import { Router } from 'express';
const router = Router();

import licensesController from '@src/controllers/licenses.controller';

router.get('/', licensesController.getAll);
router.get('/:id', licensesController.getById);
router.post('/', licensesController.create);
router.put('/:id', licensesController.update);
router.delete('/:id', licensesController.deleteById);

export default router;
