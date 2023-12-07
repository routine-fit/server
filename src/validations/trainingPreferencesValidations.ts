import Joi from 'joi';

export const allowedTrainingTypes = [
  'STRENGTH',
  'CARDIO',
  'FUNCTIONAL',
  'FLEXIBILITY',
  'ENDURANCE',
  'SPORTS_SPECIFIC',
  'AGILITY',
  'BODYWEIGHT',
];

export const trainingPreferenceSchema = Joi.object({
  id: Joi.number().integer(),
  type: Joi.string()
    .valid(...allowedTrainingTypes)
    .required(),
  time: Joi.number().positive().required(),
  intensity: Joi.string().valid('HIGH', 'MEDIUM', 'LOW').required(),
  user: Joi.object({
    connect: Joi.object({
      firebaseUid: Joi.string().required(),
    }).required(),
  }).required(),
});
