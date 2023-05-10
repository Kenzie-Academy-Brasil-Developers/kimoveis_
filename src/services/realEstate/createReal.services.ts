import { DeepPartial, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../../entities";
import { AppError } from "../../error";
import {
  TRealEstate,
  TRealEstateRequest,
} from "../../interfaces/realEstate.interfaces";

const createRealServices = async (
  payload: TRealEstateRequest,
  idCat: number,
  nameCat: string,
  isAdmin: boolean
): Promise<RealEstate> => {
  if (isAdmin === false) {
    throw new AppError("Insufficient permission", 403);
  }

  const realRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const addressPlayload = payload.address;
  const { size, value, sold } = payload;

  const address: Address = addressRepository.create({
    ...addressPlayload,
  });
  await addressRepository.save(address);

  const realEstate: RealEstate = realRepository.create({
    size,
    value,
    sold,
    address: address,
    category: {
      id: idCat,
      name: nameCat,
    },
  });
  await realRepository.save(realEstate);

  return realEstate;
};

export default createRealServices;
