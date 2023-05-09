import { z } from "zod";
import {
  categorySchema,
  categorySchemaReq,
  categorySchemaRes,
} from "../schemas/category.schemas";

type TCategoty = z.infer<typeof categorySchema>;
type TCategotyRequest = z.infer<typeof categorySchemaReq>;
type TCategotyResponse = z.infer<typeof categorySchemaRes>;

export { TCategoty, TCategotyRequest, TCategotyResponse };
