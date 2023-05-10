import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";
import { TUserResponse } from "../../interfaces/user.interfaces";
import { userSchemaRes } from "../../schemas/user.schemas";

const listUsersService = async (isAdmin: boolean): Promise<TUserResponse[]> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  if (isAdmin === false) {
    throw new AppError("Insufficient permission", 403);
  }

  const users = await userRepository.find();

  const returnUsers: TUserResponse[] = users.map((user) =>
    userSchemaRes.parse(user)
  );

  return returnUsers;
};

export default listUsersService;
