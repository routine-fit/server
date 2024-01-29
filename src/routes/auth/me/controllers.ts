import { Request, Response } from 'express';

import { prisma } from 'src/config/prisma';
import { CustomError } from 'src/interfaces/custom-error';
import { getActionSuccessMsg, notFound } from 'src/utils/messages';

const getMe = async (req: Request, res: Response) => {
  const userInfo = await prisma.userInfo.findUnique({
    where: {
      firebaseUid: req.firebaseUid,
    },
  });
  if (userInfo) {
    return res.status(200).json({
      message: getActionSuccessMsg('My information', 'found'),
      data: userInfo,
      error: false,
    });
  }
  throw new CustomError(404, notFound('My information'));
};

export default {
  getMe,
};
