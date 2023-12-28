import express from 'express';

import { validatetrainingPreferenceCreation } from 'src/validations/training-preferences';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllTrainingPreferences);
router.post('/', validatetrainingPreferenceCreation, controllers.createTrainingPreference);
router.put('/:id', controllers.editTrainingPreference);
router.delete('/:id', controllers.deleteTrainingPreference);

export default router;
