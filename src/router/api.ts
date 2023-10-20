import { Router } from 'express';
const router = Router();

import authRouter from './auth.router';
import usersRouter from './users.router';
import lawyersRouter from './lawyers.router';
import clientsRouter from './clients.router';

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/lawyers', lawyersRouter);
router.use('/clients', clientsRouter);

export default router;
