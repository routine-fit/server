import express from 'express';

import exerciseRouter from './exercise';

const router = express.Router();

router.use('/exercise', exerciseRouter);

export default router;
