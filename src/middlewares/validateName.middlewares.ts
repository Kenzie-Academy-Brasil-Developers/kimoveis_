import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";

const validateName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = req.body;

  if (name) {
    const categoryRepository: Repository<Category> =
      AppDataSource.getRepository(Category);
    const exists = await categoryRepository.exist({ where: { name: name } });
    if (exists) {
      return next(new AppError("Category already exists", 409));
    }
  }

  return next();
};

export default validateName;
