import { Router } from "express";
import { createSchedulesController } from "../controllers/schedules.controllers";
import { validateToken } from "../middlewares/validateToken.middlewares";
import validateData from "../middlewares/valitadeData.middlewares";
import { schedulesSchemaReq } from "../schemas/schedules.schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  validateToken,
  validateData(schedulesSchemaReq),
  createSchedulesController
);

export default schedulesRoutes;
