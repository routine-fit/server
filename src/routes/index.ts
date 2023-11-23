import express from 'express';

import exerciseRouter from './exercise';
import trainingPreferenceRouter from './training-preferences';
import userInfoRouter from './userInfo';

const router = express.Router();

router.use('/exercise', exerciseRouter);
router.use('/user-info', userInfoRouter);
router.use('/training-preference', trainingPreferenceRouter);

export default router;
