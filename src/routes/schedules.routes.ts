import { Router } from "express";
import {
  createSchedulesController,
  listSchedulesController,
} from "../controllers/schedules.controllers";
import { validateIsAdmin } from "../middlewares/validateAdmin.middlewares";
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
schedulesRoutes.get(
  "/realEstate/:id",
  validateToken,
  validateIsAdmin,
  listSchedulesController
);

export default schedulesRoutes;
