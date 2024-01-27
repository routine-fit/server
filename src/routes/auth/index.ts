import express from 'express';

import { isUser } from 'src/middlewares/firebase';

import meRouter from './me';

const router = express.Router();

router.use('/me', isUser, meRouter);

export default router;
