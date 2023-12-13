import express from 'express';

import { validateRoutineCreation } from 'src/validations/routine';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllRoutines);
router.post('/', validateRoutineCreation, controllers.createRoutine);
router.put('/:id', controllers.editRoutine);
router.delete('/:id', controllers.deleteRoutine);

export default router;
