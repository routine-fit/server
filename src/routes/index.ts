import express from 'express';

import authRouter from './auth';
import exerciseRouter from './exercise';
import routineRouter from './routine';
import trainingPreferenceRouter from './training-preferences';
import userInfoRouter from './user-info';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/exercise', exerciseRouter);
router.use('/routine', routineRouter);
router.use('/training-preference', trainingPreferenceRouter);
router.use('/user-info', userInfoRouter);

export default router;
