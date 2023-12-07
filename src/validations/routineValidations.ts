import Joi from 'joi';

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
