import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../error";

export const validateId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(req.params.id);

  if (id) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }
  }
  return next();
};
