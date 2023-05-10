import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";
import {
  TUserResponse,
  TUsersRequestUpdate,
} from "../../interfaces/user.interfaces";
import { userSchemaRes } from "../../schemas/user.schemas";

const updateUsersService = async (
  userData: TUsersRequestUpdate,
  userId: number,
  isAdmin: boolean
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (oldUserData?.admin && !isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const newUserData: User = userRepository.create({
    ...oldUserData,
    ...userData,
  });

  await userRepository.save(newUserData);

  const returnUser: TUserResponse = userSchemaRes.parse(newUserData);

  return returnUser;
};

export default updateUsersService;
