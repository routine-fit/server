import express from 'express';

import controllers from './controllers';

const router = express.Router();

router.get('/', controllers.getAllTrainingPreferences);
router.post('/', controllers.createTrainingPreference);
router.put('/:id', controllers.editTrainingPreference);
router.delete('/:id', controllers.deleteTrainingPreference);

export default router;
