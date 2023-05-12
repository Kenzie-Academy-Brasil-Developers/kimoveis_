import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../error";

const listREalByCategoryServices = async (id: number): Promise<Category> => {
  // const realRepository: Repository<RealEstate> =
  // AppDataSource.getRepository(RealEstate);

  // const returnUsers: TUserResponse[] = users.map((user) =>
  //   userSchemaRes.parse(user)
  // );

  // const categories = await realRepository
  //   .createQueryBuilder("realEstate")
  //   .leftJoin("realEstate.category", "category")
  //   .where("category.id = :id", { id: id })
  //   .getOne();

  const categopryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories = await categopryRepository.findOne({
    where: {
      realEstate: { id: id },
    },
    relations: {
      realEstate: true,
    },
  });

  if (!categories) {
    throw new AppError("Category not found", 404);
  }

  return categories!;
};

export default listREalByCategoryServices;
