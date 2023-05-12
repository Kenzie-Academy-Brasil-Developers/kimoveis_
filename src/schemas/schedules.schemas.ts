import { z } from "zod";

const schedulesSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
  userId: z.number(),
});

const schedulesSchemaReq = schedulesSchema.omit({
  id: true,
  userId: true,
});

export { schedulesSchema, schedulesSchemaReq };
