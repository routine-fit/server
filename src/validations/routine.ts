import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { CustomError } from 'src/types/custom-error';

export const routineSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().required(),
  type: Joi.string().required(),
  userId: Joi.object({
    connect: Joi.object({
      firebaseUid: Joi.string().required(),
    }).required(),
  }).required(),
});

export const validateRoutineCreation = (req: Request, res: Response, next: NextFunction) => {
  const validation = routineSchema.validate(req.body);
  if (validation.error) {
    throw new CustomError(400, validation.error.details[0].message);
  }
  return next();
};
