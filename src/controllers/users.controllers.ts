import { Request, Response } from "express";
import { TUserRequest } from "../interfaces/user.interfaces";
import createUsersService from "../services/users/createUser.services";
import deleteUsersService from "../services/users/deleteUser.services";
import listUsersService from "../services/users/listUser.services";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const isAdmin = res.locals.adminToken.admin;

  const users = await listUsersService(isAdmin);

  return res.status(200).json(users);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const isAdmin = res.locals.adminToken.admin;

  await deleteUsersService(id, isAdmin);

  return res.status(204).send();
};

export { createUsersController, listUsersController, deleteUsersController };
