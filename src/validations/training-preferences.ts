import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { CustomError } from 'src/interfaces/custom-error';

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

export const trainingPreferenceSchema = yup.object({
  type: yup.string().oneOf(allowedTrainingTypes).required(),
  time: yup.number().positive().required(),
  intensity: yup.string().oneOf(['HIGH', 'MEDIUM', 'LOW']).required(),
  user: yup
    .object({
      connect: yup
        .object({
          firebaseUid: yup.string().required(),
        })
        .required(),
    })
    .required(),
});

export const validateTrainingPreferenceCreation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await trainingPreferenceSchema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
