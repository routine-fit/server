import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { CustomError } from 'src/types/custom-error';

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

export const validatetrainingPreferenceCreation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validation = trainingPreferenceSchema.validate(req.body);
  if (validation.error) {
    throw new CustomError(400, validation.error.details[0].message);
  }
  return next();
};
