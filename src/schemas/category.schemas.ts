import { z } from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

const categorySchemaReq = categorySchema.omit({ id: true });

const categorySchemaRes = z.array(categorySchema);

export { categorySchema, categorySchemaReq, categorySchemaRes };
