import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/types/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';

const getAllUserInfo = async (req: Request, res: Response) => {
  const userInfo = await prisma.userInfo.findMany({
    include: {
      routine: true,
    },
  });
  if (userInfo.length > 0) {
    return res.status(200).json({
      message: getActionSuccessMsg('User Info', 'found'),
      data: userInfo,
      error: false,
    });
  }
  throw new CustomError(404, notFound('User Info'));
};

const createUserInfo = async (req: Request, res: Response) => {
  const createdUserInfo = await prisma.userInfo.create({
    data: req.body,
    include: {
      routine: true,
      growthRecord: true,
    },
  });

  return res.status(201).json({
    message: getActionSuccessMsg('User Info', 'created'),
    data: createdUserInfo,
    error: false,
  });
};

const editUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const userInfo = await prisma.userInfo.findUnique({
    where: { id: Number(id) },
  });

  if (!userInfo) {
    throw new CustomError(404, notFound('User Info'));
  }

  const editedUserInfo = await prisma.userInfo.update({
    where: { id: Number(id) },
    data: { ...req.body },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('User Info', 'updated'),
    data: editedUserInfo,
    error: false,
  });
};

const deleteUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const userInfo = await prisma.userInfo.findUnique({
    where: { id: Number(id) },
    include: {
      routine: true,
      growthRecord: true,
    },
  });

  if (!userInfo) {
    throw new CustomError(404, notFound('User Info'));
  }

  const deletedUserInfo = await prisma.userInfo.delete({
    where: { id: Number(id) },
  });

  return res.status(200).json({
    message: getActionSuccessMsg('User Info', 'deleted'),
    data: deletedUserInfo,
    error: false,
  });
};

export default {
  getAllUserInfo,
  createUserInfo,
  editUserInfo,
  deleteUserInfo,
};
