import { Router } from 'express';
const router = Router();

import casesController from '@src/controllers/cases.controller';

router.get('/', casesController.getAll);
router.get('/:id', casesController.getById);
router.post('/', casesController.create);
router.put('/:id', casesController.update);
router.delete('/:id', casesController.deleteById);

export default router;
