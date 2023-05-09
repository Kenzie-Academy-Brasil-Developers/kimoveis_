import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";

const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;

  if (email) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const exists = await userRepository.exist({ where: { email: email } });
    if (exists) {
      return next(new AppError("Email already exists", 409));
    }
  }

  return next();
};

export default validateEmail;
