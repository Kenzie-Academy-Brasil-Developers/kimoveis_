import { Request, Response } from "express";
import { TLogin } from "../interfaces/user.interfaces";
import loginService from "../services/login/loginUser.services";

const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TLogin = req.body;

  const token = await loginService(payload);

  return res.json({ token });
};

export { loginController };
