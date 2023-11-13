import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllExercises);
router.post('/', controllers.createExercise);
router.put('/:id', controllers.editExercise);
router.delete('/:id', controllers.deleteExercise);

export default router;
