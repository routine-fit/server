import Joi from 'joi';

export const userInfoSchema = Joi.object({
  firebaseUid: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.string().isoDate().required(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'BINARY', 'PREFER_NOT_SPECIFY').required(),
  phone: Joi.string().required(),
  pushNotification: Joi.boolean().required(),
});
