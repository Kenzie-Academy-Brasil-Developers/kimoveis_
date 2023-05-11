import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { TCategotyResponse } from "../../interfaces/category.interfaces";
import { categorySchemaRes } from "../../schemas/category.schemas";

const listREalByCategoryServices = async (id: number): Promise<void> => {
  const categopryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const realRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const categories = await categopryRepository.find({
    where: { id: id },
  });

  //   return categories;
};

export default listREalByCategoryServices;
