import { Router } from 'express';
const router = Router();

import clientsController from '@src/controllers/clients.controller';

router.get('/', clientsController.getAll);
router.get('/:id', clientsController.getById);
router.post('/', clientsController.create);
router.put('/:id', clientsController.update);
router.delete('/:id', clientsController.deleteById);

export default router;
