import { Request, Response } from "express";
import {
  TUserRequest,
  TUserResponse,
  TUsersRequestUpdate,
} from "../interfaces/user.interfaces";
import createUsersService from "../services/users/createUser.services";
import deleteUsersService from "../services/users/deleteUser.services";
import listUsersService from "../services/users/listUser.services";
import updateUsersService from "../services/users/updateUser.services";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TUserRequest = req.body;

  const newUser = await createUsersService(payload);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdmin = res.locals.dataToken.admin;

  const users = await listUsersService(isAdmin);

  console.log(users);

  return res.status(200).json(users);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUsersRequestUpdate = req.body;
  const userId: number = parseInt(req.params.id);
  const isAdmin = res.locals.dataToken.admin;

  const newUserData: TUserResponse = await updateUsersService(
    userData,
    userId,
    isAdmin
  );

  return res.json(newUserData);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const isAdmin = res.locals.dataToken.admin;

  await deleteUsersService(id, isAdmin);

  return res.status(204).send();
};

export {
  createUsersController,
  listUsersController,
  updateUsersController,
  deleteUsersController,
};
