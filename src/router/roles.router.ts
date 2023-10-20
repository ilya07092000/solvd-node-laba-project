import { Router } from 'express';
const router = Router();

import rolesController from '@src/controllers/roles.controller';

router.get('/', rolesController.getAll);
router.get('/:id', rolesController.getById);
router.post('/', rolesController.create);
router.put('/:id', rolesController.update);
router.delete('/:id', rolesController.deleteById);

export default router;
