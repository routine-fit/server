import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { CustomError } from 'src/types/custom-error';

const muscleGroupValues = [
  'ABDOMINAL',
  'BICEPS',
  'DELTOID',
  'ERECTOR_SPINAE',
  'LATISSIMUS_DORSI',
  'PECTORAL',
  'TRAPEZIUS',
  'TRICEPS',
];

export const exerciseSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().required(),
  muscleGroup: Joi.string()
    .valid(...muscleGroupValues)
    .required(),
  links: Joi.object().keys({
    create: Joi.object()
      .keys({
        url: Joi.string().required(),
      })
      .required(),
  }),
  userId: Joi.object({
    connect: Joi.object({
      firebaseUid: Joi.string().required(),
    }).required(),
  }).required(),
});

export const validateExerciseCreation = (req: Request, res: Response, next: NextFunction) => {
  const validation = exerciseSchema.validate(req.body);
  if (validation.error) {
    throw new CustomError(400, validation.error.details[0].message);
  }
  return next();
};
