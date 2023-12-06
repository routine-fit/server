import { MuscleGroup, Prisma } from '@prisma/client';

// REVIEW Muscles groups
export const exercises: Prisma.ExerciseCreateManyInput[] = [
  {
    name: 'Remo con maquina',
    muscleGroup: MuscleGroup.PECTORAL,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    name: 'Subida al cajon c/mancuernas',
    muscleGroup: MuscleGroup.ABDOMINAL,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    name: 'Movilidad Escapular',
    muscleGroup: MuscleGroup.ERECTOR_SPINAE,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN10',
  },
  {
    name: 'Plancha Alta Toco Kettlebell',
    muscleGroup: MuscleGroup.ERECTOR_SPINAE,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    name: 'Lumbar alternado',
    muscleGroup: MuscleGroup.LATISSIMUS_DORSI,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    name: 'Puente de gluteo',
    muscleGroup: MuscleGroup.ABDOMINAL,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN11',
  },
  {
    name: 'Plancha lateral + Remo',
    muscleGroup: MuscleGroup.TRICEPS,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    name: 'Serrucho mancuerna',
    muscleGroup: MuscleGroup.BICEPS,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    name: 'Sentadillas atras',
    muscleGroup: MuscleGroup.ERECTOR_SPINAE,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN12',
  },
  {
    name: 'Peso muerto c/mancuernas',
    muscleGroup: MuscleGroup.PECTORAL,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    name: 'Press inclinado con mancuernas',
    muscleGroup: MuscleGroup.PECTORAL,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    name: 'Vuelo lateral',
    muscleGroup: MuscleGroup.BICEPS,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN13',
  },
  {
    name: 'Flexion-extension diamante',
    muscleGroup: MuscleGroup.ABDOMINAL,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
  },
  {
    name: 'Bulgara c/press',
    muscleGroup: MuscleGroup.LATISSIMUS_DORSI,
    userInfoId: 'M5MCzG5aCKpf0B7qpNNsi8RyjN14',
  },
];
