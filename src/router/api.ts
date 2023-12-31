import { Router } from 'express';
const router = Router();

import authRouter from './auth.router';
import usersRouter from './users.router';
import lawyersRouter from './lawyers.router';
import clientsRouter from './clients.router';
import casesRouter from './cases.router';
import adminsRouter from './admins.router';
import rolesRouter from './roles.router';
import reviewsRouter from './reviews.router';
import licensesRouter from './licenses.router';
import verificationsRouter from './verifications';
import profileRouter from './profile.router';
import conflictsRouter from './conflicts.router';

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/lawyers', lawyersRouter);
router.use('/clients', clientsRouter);
router.use('/cases', casesRouter);
router.use('/admins', adminsRouter);
router.use('/roles', rolesRouter);
router.use('/reviews', reviewsRouter);
router.use('/licenses', licensesRouter);
router.use('/verifications', verificationsRouter);
router.use('/profile', profileRouter);
router.use('/conflicts', conflictsRouter);

export default router;
