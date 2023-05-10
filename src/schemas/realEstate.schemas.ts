import { z } from "zod";
const AddressSchema = z.object({
  id: z.number(),
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const AddressSchemaReq = AddressSchema.omit({
  id: true,
});

const realEstateschema = z.object({
  id: z.number(),
  value: z.union([z.number().optional(), z.string().optional()]).default("0"),
  size: z.number().positive(),
  categoryId: z.number(),
  address: AddressSchemaReq,
  sold: z.boolean().default(false),
  createdAt: z.date(),
  deletedAt: z.date().nullish(),
});

const realEstateschemaReq = realEstateschema.omit({
  id: true,
  createdAt: true,
  deletedAt: true,
});

export { realEstateschema, realEstateschemaReq };
