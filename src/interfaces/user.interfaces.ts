import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  userSchema,
  userSchemaLogin,
  userSchemaReq,
  userSchemaRes,
} from "../schemas/user.schemas";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaReq>;
type TUserResponse = z.infer<typeof userSchemaRes>;
type TLogin = z.infer<typeof userSchemaLogin>;
type TUsersRequestUpdate = Omit<DeepPartial<TUserRequest>, "admin">;

export { TUser, TUserRequest, TUserResponse, TUsersRequestUpdate, TLogin };
