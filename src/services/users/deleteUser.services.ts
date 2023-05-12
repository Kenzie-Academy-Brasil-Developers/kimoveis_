import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";

const deleteUsersService = async (
  id: number,
  isAdmin: boolean
): Promise<void> => {
  if (!isAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    id: id,
  });

  await userRepository.softRemove(user!);
};

export default deleteUsersService;
