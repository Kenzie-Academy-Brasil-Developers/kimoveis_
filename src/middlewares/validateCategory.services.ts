import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";

const validateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { categoryId } = req.body;

  if (categoryId) {
    const categoryRepository: Repository<Category> =
      AppDataSource.getRepository(Category);
    const exists = await categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!exists) {
      return next(new AppError("Category dons`t exists", 409));
    }

    res.locals.categoryData = {
      id: exists.id,
      name: exists.name,
    };
  }

  return next();
};

export default validateCategory;
