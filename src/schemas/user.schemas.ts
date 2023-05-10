import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
});

const userSchemaReq = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userSchemaRes = userSchema.omit({
  password: true,
});

const userSchemaLogin = z.object({
  email: z.string(),
  password: z.string(),
});

const userSchemaReqUpdate = userSchemaReq.omit({ admin: true }).partial();

export {
  userSchema,
  userSchemaReq,
  userSchemaRes,
  userSchemaLogin,
  userSchemaReqUpdate,
};
