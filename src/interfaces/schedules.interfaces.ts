import { z } from "zod";
import {
  schedulesSchema,
  schedulesSchemaReq,
} from "../schemas/schedules.schemas";

type TSchedules = z.infer<typeof schedulesSchema>;
type TSchedulesRequest = z.infer<typeof schedulesSchemaReq>;

export { TSchedules, TSchedulesRequest };
