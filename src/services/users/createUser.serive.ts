import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { hash } from "bcryptjs";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { userSchemaRes } from "../../schemas/user.schemas";

const createUsersService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  userData.password = await hash(userData.password, 10);

  const user: User = userRepository.create(userData);
  await userRepository.save(user);

  const returnUSer: TUserResponse = userSchemaRes.parse(user);

  return returnUSer;
};

export default createUsersService;
