import { Repository, SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../error";
const listSchedulesService = async (
  isAdmin: boolean,
  idRealEstate: number
): Promise<RealEstate[]> => {
  const realRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  if (isAdmin === false) {
    throw new AppError("Insufficient permission", 403);
  }
  const real = await realRepository.findOneBy({
    id: idRealEstate,
  });
  if (!real) {
    throw new AppError("RealEstate not found", 404);
  }
  const result = await realRepository
    .createQueryBuilder("real_estate")
    .leftJoinAndSelect("real_estate.address", "address")
    .leftJoinAndSelect("real_estate.category", "category")
    .leftJoinAndSelect("real_estate.schedules", "schedules")
    .leftJoinAndSelect("schedules.user", "user")
    .where("real_estate.id = :id", { id: idRealEstate })
    .getMany();


  return result!;
};
export default listSchedulesService;
