import { Router } from 'express';
const router = Router();
import authRouter from './auth.router';
import usersRouter from './users.router';

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;
