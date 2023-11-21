import express from 'express';

import exerciseRouter from './exercise';
import routineRouter from './routine';

const router = express.Router();

router.use('/exercise', exerciseRouter);
router.use('/routine', routineRouter);

export default router;
