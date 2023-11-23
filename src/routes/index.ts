import express from 'express';

import exerciseRouter from './exercise';
import routineRouter from './routine';
import trainingPreferenceRouter from './training-preferences';
import userInfoRouter from './userInfo';

const router = express.Router();

router.use('/exercise', exerciseRouter);
router.use('/routine', routineRouter);
router.use('/user-info', userInfoRouter);
router.use('/training-preference', trainingPreferenceRouter);

export default router;
