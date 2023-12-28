import express from 'express';

import { validateUserInfoCreation } from 'src/validations/user-info';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllUserInfo);
router.post('/', validateUserInfoCreation, controllers.createUserInfo);
router.put('/:id', controllers.editUserInfo);
router.delete('/:id', controllers.deleteUserInfo);

export default router;
