import Joi from 'joi';

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

export const exerciseLinkSchema = Joi.object({
  id: Joi.number().integer(),
  url: Joi.string().required(),
  exerciseId: Joi.number().integer().required(),
});

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
