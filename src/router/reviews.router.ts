import { Router } from 'express';
const router = Router();

import reviewsController from '@src/controllers/reviews.controller';

router.get('/', reviewsController.getAll);
router.get('/:id', reviewsController.getById);
router.post('/', reviewsController.create);
router.put('/:id', reviewsController.update);
router.delete('/:id', reviewsController.deleteById);

export default router;
