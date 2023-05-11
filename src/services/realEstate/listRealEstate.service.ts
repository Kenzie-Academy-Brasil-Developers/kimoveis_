import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const listRealEstateService = async (): Promise<RealEstate[]> => {
  const realRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate = await realRepository.find({
    relations: {
      address: true,
    },
  });

  return realEstate;
};

export default listRealEstateService;
