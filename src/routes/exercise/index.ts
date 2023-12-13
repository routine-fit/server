import express from 'express';

import { validateExerciseCreation } from 'src/validations/exercise';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllExercises);
router.post('/', validateExerciseCreation, controllers.createExercise);
router.put('/:id', controllers.editExercise);
router.delete('/:id', controllers.deleteExercise);

export default router;
