import { Router } from 'express';
const router = Router();

import authController from '../controllers/auth.controller';

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;
