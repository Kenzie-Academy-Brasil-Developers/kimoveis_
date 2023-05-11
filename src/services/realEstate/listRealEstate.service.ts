import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../../entities";
import { TRealEstate } from "../../interfaces/realEstate.interfaces";
import { realEstateschema } from "../../schemas/realEstate.schemas";

const listRealEstateService = async (): Promise<RealEstate[]> => {
  const realRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstate = await realRepository.find({
    relations: {
      address: true,
    },
  });

  console.log(realEstate);
  
  return realEstate;
};

export default listRealEstateService;
