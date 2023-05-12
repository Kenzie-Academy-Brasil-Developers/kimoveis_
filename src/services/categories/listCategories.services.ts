import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TCategotyResponse } from "../../interfaces/category.interfaces";

const listCategoriesServices = async (): Promise<TCategotyResponse> => {
  const categpryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories = await categpryRepository.find();

  return categories;
};

export default listCategoriesServices;
