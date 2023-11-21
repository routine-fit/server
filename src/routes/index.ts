import express from 'express';

import exerciseRouter from './exercise';
import userInfoRouter from './userInfo';

const router = express.Router();

router.use('/exercise', exerciseRouter);
router.use('/user-info', userInfoRouter);

export default router;
