import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { CustomError } from 'src/interfaces/custom-error';

export const routineSchema = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  userId: yup
    .object({
      connect: yup
        .object({
          firebaseUid: yup.string().required(),
        })
        .required(),
    })
    .required(),
});

export const validateRoutineCreation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await routineSchema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
