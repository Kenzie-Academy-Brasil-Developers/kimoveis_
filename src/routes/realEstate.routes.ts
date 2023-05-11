import { Router } from "express";
import {
  createRealEstateController,
  listRealEstateController,
} from "../controllers/realEstate.controllers";
import { RealEstate } from "../entities";
import validateCategory from "../middlewares/validateCategory.services";
import validateNumber from "../middlewares/validateNumber.middlewares";
import { validateToken } from "../middlewares/validateToken.middlewares";
import validateData from "../middlewares/valitadeData.middlewares";
import { realEstateschemaReq } from "../schemas/realEstate.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  validateToken,
  validateData(realEstateschemaReq),
  validateNumber,
  validateCategory,
  createRealEstateController
);
realEstateRoutes.get("", listRealEstateController);

export default realEstateRoutes;
