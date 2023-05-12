import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";

const listREalByCategoryServices = async (id: number): Promise<Category> => {
  const categopryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories = await categopryRepository
    .createQueryBuilder("category")
    .leftJoinAndSelect("category.realEstate", "realEstate")
    .where("category.id = :id", { id: id })
    .getOne();

  if (!categories) {
    throw new AppError("Category not found", 404);
  }

  return categories!;
};

export default listREalByCategoryServices;
