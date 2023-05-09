import { Router } from "express";
import { createUsersController } from "../controllers/users.controllers";
import validateEmail from "../middlewares/validateEmail.middlewares";
import valitadeDataMiddleware from "../middlewares/valitadeData.middlewares";
import { userSchemaReq } from "../schemas/user.schemas";
import createUsersService from "../services/users/createUser.services";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  valitadeDataMiddleware(userSchemaReq),
  validateEmail,
  createUsersController
);

export default userRoutes;
