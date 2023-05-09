import { z } from "zod";

const realEstateschema = z.object({
  id: z.number(),
  value: z.number(),
  size: z.number(),
  address: z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7),
    city: z.string().max(20),
    state: z.string().max(2),
  }),
  categoryId: z.number(),
  sold: z.boolean(),
  createdAt: z.date(),
  deletedAt: z.date().nullish(),
});

const realEstateschemaReq = realEstateschema.omit({
  id: true,
  createdAt: true,
  deletedAt: true,
});

export { realEstateschema, realEstateschemaReq };
