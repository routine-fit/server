import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { CustomError } from 'src/types/custom-error';

export const userInfoSchema = Joi.object({
  firebaseUid: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.string().isoDate().required(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'BINARY', 'PREFER_NOT_SPECIFY').required(),
  phone: Joi.string().required(),
  pushNotification: Joi.boolean().required(),
});

export const validateUserInfoCreation = (req: Request, res: Response, next: NextFunction) => {
  const validation = userInfoSchema.validate(req.body);
  if (validation.error) {
    throw new CustomError(400, validation.error.details[0].message);
  }
  return next();
};
