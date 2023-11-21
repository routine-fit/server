import express from 'express';

import exerciseRouter from './exercise';
import trainingPreferenceRouter from './training-preferences';

const router = express.Router();

router.use('/exercise', exerciseRouter);
router.use('/training-preference', trainingPreferenceRouter);

export default router;
