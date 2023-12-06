import { Exercise, Prisma } from '@prisma/client';

export const generateExerciseLinks = (
  exercises: Exercise[],
): Prisma.ExerciseLinkCreateManyInput[] => {
  return exercises.map(({ id }) => ({
    url: 'https://www.youtube.com/watch?v=4aYK9qdGvx4&ab_channel=TheGainzCenter',
    exerciseId: id,
  }));
};
