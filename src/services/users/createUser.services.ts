import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { hash } from "bcryptjs";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interfaces";
import { userSchemaRes } from "../../schemas/user.schemas";

const createUsersService = async (
  payload: TUserRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  // payload.password = await hash(payload.password, 10);

  const user: User = userRepository.create(payload);
  await userRepository.save(user);

  const returnUser: TUserResponse = userSchemaRes.parse(user);

  return returnUser;
};

export default createUsersService;
