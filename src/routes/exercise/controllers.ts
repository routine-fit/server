import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

const getAllExercises = async (req: Request, res: Response) => {
  const exercises = await prisma.exercise.findMany({
    include: {
      links: true,
    },
  });
  if (exercises.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('Exercises', 'found'),
      data: exercises,
      error: false,
    });
  }
  throw new CustomError(404, notFound('Exercises'));
};

const createExercise = async (req: Request, res: Response) => {
  const createdExercise = await prisma.exercise.create({
    data: req.body,
    include: {
      links: true,
    },
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Exercise', 'created'),
    data: createdExercise,
    error: false,
  });
};

const editExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(id) },
  });

  if (!exercise) {
    throw new CustomError(404, notFound('Exercise'));
  }

  // TO-DO: Middleware to validate the data and structure the info.
  const editedExercise = await prisma.exercise.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Exercise', 'updated'),
    data: editedExercise,
    error: false,
  });
};

const deleteExercise = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id: Number(id) },
    include: {
      links: true,
    },
  });

  if (!exercise) {
    throw new CustomError(404, notFound('Exercise'));
  }

  const deletedExercise = await prisma.exercise.delete({
    where: { id: Number(id) },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Exercise', 'deleted'),
    data: deletedExercise,
    error: false,
  });
};

export default {
  getAllExercises,
  createExercise,
  editExercise,
  deleteExercise,
};
