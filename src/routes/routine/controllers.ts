import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

const getAllRoutines = async (req: Request, res: Response) => {
  const routines = await prisma.routine.findMany({
    include: {
      userId: true,
    },
  });
  if (routines.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('routines', 'found'),
      data: routines,
      error: false,
    });
  }
  throw new CustomError(404, notFound('routines'));
};

const createRoutine = async (req: Request, res: Response) => {
  const createdRoutine = await prisma.routine.create({
    data: req.body,
    include: {
      userId: true,
    },
  });

  return res.status(201).json({
    message: getActionSuccessMsg('Exercise', 'created'),
    data: createdRoutine,
    error: false,
  });
};

const editRoutine = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const routine = await prisma.routine.findUnique({
    where: { id: Number(id) },
  });

  if (!routine) {
    throw new CustomError(404, notFound('Routine'));
  }

  const editedRoutine = await prisma.routine.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Routine', 'updated'),
    data: editedRoutine,
    error: false,
  });
};

const deleteRoutine = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const routine = await prisma.routine.findUnique({
    where: { id: Number(id) },
  });

  if (!routine) {
    throw new CustomError(404, notFound('Routine'));
  }

  const deletedRoutine = await prisma.routine.delete({
    where: { id: Number(id) },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('Routine', 'deleted'),
    data: deletedRoutine,
    error: false,
  });
};

export default {
  getAllRoutines,
  createRoutine,
  editRoutine,
  deleteRoutine,
};
