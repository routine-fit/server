import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllRoutines);
router.post('/', controllers.createRoutine);
router.put('/:id', controllers.editRoutine);
router.delete('/:id', controllers.deleteRoutine);

export default router;
