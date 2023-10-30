import { Router } from 'express';
const router = Router();

import authMiddleware from '@src/middlewares/auth.middleware';
import profileController from '@src/controllers/profile.controller';

/**
 * FOR AUTH USERS
 */
router.get('/', [authMiddleware([])], profileController.getProfile);

export default router;
