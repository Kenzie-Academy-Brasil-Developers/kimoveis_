import { Request, Response } from "express";
import { TUserRequest } from "../interfaces/user.interfaces";
import createUsersService from "../services/users/createUser.serive";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TUserRequest = req.body;

  const newUser = await createUsersService(userData);

  return res.status(201).json(newUser);
};

export {createUsersController}