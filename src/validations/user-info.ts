import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { CustomError } from 'src/interfaces/custom-error';

export const userInfoSchema = yup.object({
  firebaseUid: yup.string().required(),
  name: yup.string().required(),
  lastName: yup.string().required(),
  birthDate: yup.date().required(),
  gender: yup.string().oneOf(['MALE', 'FEMALE', 'BINARY', 'PREFER_NOT_SPECIFY']).required(),
  pushNotification: yup.boolean().required(),
});

export const validateUserInfoCreation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userInfoSchema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    if (yup.ValidationError.isError(error)) {
      throw new CustomError(400, error.errors[0]);
    } else {
      throw new CustomError(500, 'Internal Server Error');
    }
  }
};
