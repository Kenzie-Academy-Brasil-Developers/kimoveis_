import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  userSchema,
  userSchemaReq,
  userSchemaRes,
} from "../schemas/user.schemas";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaReq>;
type TUserResponse = z.infer<typeof userSchemaRes>;
type TUsersRequestUpdate = DeepPartial<TUserRequest>;

export { TUser, TUserRequest, TUserResponse, TUsersRequestUpdate };
