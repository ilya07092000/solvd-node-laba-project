import { Router } from 'express';
const router = Router();

import authRouter from './auth.router';
import usersRouter from './users.router';
import lawyersRouter from './lawyers.router';

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/lawyers', lawyersRouter);

export default router;
