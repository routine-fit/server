import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllUserInfo);
router.post('/', controllers.createUserInfo);
router.put('/:id', controllers.editUserInfo);
router.delete('/:id', controllers.deleteUserInfo);

export default router;
