import { MuscleGroup, Prisma } from '@prisma/client';

// REVIEW Muscles groups
export const exercises: Prisma.ExerciseCreateManyInput[] = [
  {
    name: 'Remo con maquina',
    muscleGroup: MuscleGroup.PECTORAL,
  },
  {
    name: 'Subida al cajon c/mancuernas',
    muscleGroup: MuscleGroup.ABDOMINAL,
  },
  {
    name: 'Movilidad Escapular',
    muscleGroup: MuscleGroup.ERECTOR_SPINAE,
  },
  {
    name: 'Plancha Alta Toco Kettlebell',
    muscleGroup: MuscleGroup.ERECTOR_SPINAE,
  },
  {
    name: 'Lumbar alternado',
    muscleGroup: MuscleGroup.LATISSIMUS_DORSI,
  },
  {
    name: 'Puente de gluteo',
    muscleGroup: MuscleGroup.ABDOMINAL,
  },
  {
    name: 'Plancha lateral + Remo',
    muscleGroup: MuscleGroup.TRICEPS,
  },
  {
    name: 'Serrucho mancuerna',
    muscleGroup: MuscleGroup.BICEPS,
  },
  {
    name: 'Sentadillas atras',
    muscleGroup: MuscleGroup.ERECTOR_SPINAE,
  },
  {
    name: 'Peso muerto c/mancuernas',
    muscleGroup: MuscleGroup.PECTORAL,
  },
  {
    name: 'Press inclinado con mancuernas',
    muscleGroup: MuscleGroup.PECTORAL,
  },
  {
    name: 'Vuelo lateral',
    muscleGroup: MuscleGroup.BICEPS,
  },
  {
    name: 'Flexion-extension diamante',
    muscleGroup: MuscleGroup.ABDOMINAL,
  },
  {
    name: 'Bulgara c/press',
    muscleGroup: MuscleGroup.LATISSIMUS_DORSI,
  },
];
