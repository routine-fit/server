import { Request, Response } from 'express';
import fs from 'fs';

import { CustomError } from 'src/types/custom-error';

import users from '../../data/users';

const getAllUsers = (req: Request, res: Response) => {
  const allUsers = users.filter(
    (user) => (user.firstName && user.firstName === req.body.firstName) || user.isActive,
  );
  if (allUsers.length > 0) {
    return res.status(200).json({
      message: 'Showing Users.',
      data: allUsers,
      error: false,
    });
  }
  throw new CustomError(404, 'Cannot show the list of Users.');
};

const getUserById = (req: Request, res: Response) => {
  if (req.params.id) {
    const user = users.find((user) => user.id === req.params.id && user.isActive);
    if (!user) {
      throw new CustomError(404, `Could not found an user by the id of ${req.params.id}.`);
    }
    return res.status(200).json({
      message: `Showing the specified user by the id of ${req.params.id}.`,
      data: user,
      error: false,
    });
  }
  throw new CustomError(400, 'No input available.');
};

const createUser = (req: Request, res: Response) => {
  const newUser = req.body;
  if (newUser.id && newUser.firstName && newUser.lastName && newUser.email && newUser.password) {
    users.push(newUser);
    fs.writeFile('src/data/users.json', JSON.stringify(users), (err) => {
      if (err) {
        throw new CustomError(500, `Something went wrong: ${err.message}`);
      } else {
        return res.status(200).json({
          message: 'User added successfully.',
          data: newUser,
          error: false,
        });
      }
    });
  }
};

const editUser = (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new CustomError(400, 'Missing id parameter');
  }
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    throw new CustomError(404, 'User not found');
  }
  const newUsers = users.filter((user) => user.id !== req.params.id);
  const editedUser = {
    ...user,
    ...req.body,
  };
  newUsers.push(editedUser);
  fs.writeFile('src/data/users.json', JSON.stringify(newUsers), (err) => {
    if (err) {
      throw new CustomError(500, `Something went wrong: ${err.message}`);
    } else {
      return res.status(200).json({
        message: 'User updated',
        data: editedUser,
        error: false,
      });
    }
  });
};

const deleteUser = (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new CustomError(400, 'Missing id parameter');
  }
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    throw new CustomError(404, 'User not found');
  }
  const newUsers = users.filter((user) => user.id !== req.params.id);
  const editedUser = {
    ...user,
    isActive: false,
  };
  newUsers.push(editedUser);
  fs.writeFile('src/data/users.json', JSON.stringify(newUsers), (err) => {
    if (err) {
      throw new CustomError(500, `Something went wrong: ${err.message}`);
    } else {
      return res.status(200).json({
        message: 'User deleted',
        data: editedUser,
        error: false,
      });
    }
  });
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};
