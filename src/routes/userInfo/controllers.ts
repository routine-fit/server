import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/types/custom-error';
import { getActionSuccessMsg, missingId, notFound } from 'src/utils/messages';
import { userInfoSchema } from 'src/validations/userInfoValidations';

// TO-DO: Update the query params id with firebaseUid or uid
const getAllUserInfo = async (req: Request, res: Response) => {
  const userInfo = await prisma.userInfo.findMany({
    include: {
      routines: true,
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
  try {
    const { error, value } = userInfoSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const createdUserInfo = await prisma.userInfo.create({
      data: value,
      include: {
        routines: true,
        growthRecords: true,
      },
    });

    return res.status(201).json({
      message: getActionSuccessMsg('User Info', 'created'),
      data: createdUserInfo,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: 'Internal Server Error',
    });
  }
};

const editUserInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(400, missingId);
  }

  const userInfo = await prisma.userInfo.findUnique({
    where: { firebaseUid: id },
  });

  if (!userInfo) {
    throw new CustomError(404, notFound('User Info'));
  }

  const editedUserInfo = await prisma.userInfo.update({
    where: { firebaseUid: id },
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
    where: { firebaseUid: id },
    include: {
      routines: true,
      growthRecords: true,
    },
  });

  if (!userInfo) {
    throw new CustomError(404, notFound('User Info'));
  }

  const deletedUserInfo = await prisma.userInfo.delete({
    where: { firebaseUid: id },
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
