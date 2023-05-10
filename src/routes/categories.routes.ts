import { Router } from "express";
import {
  createCategoriesController,
  listCategoriesController,
} from "../controllers/categories.controllers";
import validateName from "../middlewares/validateName.middlewares";
import { validateToken } from "../middlewares/validateToken.middlewares";
import validateData from "../middlewares/valitadeData.middlewares";
import { categorySchemaReq } from "../schemas/category.schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  validateData(categorySchemaReq),
  validateToken,
  validateName,
  createCategoriesController
);
categoriesRoutes.get("", listCategoriesController);

export default categoriesRoutes;
