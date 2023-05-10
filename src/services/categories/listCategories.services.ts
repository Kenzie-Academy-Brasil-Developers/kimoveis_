import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TCategotyResponse } from "../../interfaces/category.interfaces";
import { categorySchemaRes } from "../../schemas/category.schemas";

const listCategoriesServices = async (): Promise<TCategotyResponse> => {
  const categpryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories = await categpryRepository.find();

  //   const returnCategoris: TCategotyResponse[] = categories.map((category) =>
  //     categorySchemaRes.parse(category)
  //   );
  return categories;
};

export default listCategoriesServices;
