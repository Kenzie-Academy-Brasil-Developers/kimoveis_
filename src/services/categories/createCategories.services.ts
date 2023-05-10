import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";
import {
  TCategoty,
  TCategotyRequest,
} from "../../interfaces/category.interfaces";
import { categorySchema } from "../../schemas/category.schemas";

const createCategoriesServices = async (
  categoryData: TCategotyRequest,
  isAdmin: boolean
): Promise<TCategoty> => {
  if (isAdmin === false) {
    throw new AppError("Insufficient permission", 403);
  }

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepository.create(categoryData);
  await categoryRepository.save(category);

  const returnCategory: TCategoty = categorySchema.parse(category);

  return returnCategory;
};

export default createCategoriesServices;
