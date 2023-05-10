import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../../entities";
import { TLogin } from "../../interfaces/user.interfaces";

const loginService = async (payload: TLogin): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  console.log(typeof user.password, user.password, "data");

  console.log(typeof payload.password, payload.password, "payload");

  const passwordMatch = await compare(payload.password, user.password);

  console.log(passwordMatch);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  console.log(token);

  return token;
};

export default loginService;
