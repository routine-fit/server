import express from 'express';

import { validateTrainingPreferenceCreation } from 'src/validations/training-preferences';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllTrainingPreferences);
router.post('/', validateTrainingPreferenceCreation, controllers.createTrainingPreference);
router.put('/:id', controllers.editTrainingPreference);
router.delete('/:id', controllers.deleteTrainingPreference);

export default router;
