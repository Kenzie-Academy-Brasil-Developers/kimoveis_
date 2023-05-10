import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  listUsersController,
} from "../controllers/users.controllers";
import validateEmail from "../middlewares/validateEmail.middlewares";
import { validateId } from "../middlewares/validateId.middlewares";
import { validateToken } from "../middlewares/validateToken.middlewares";
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
userRoutes.get("", validateToken, listUsersController);
userRoutes.patch(
  "/:id",
  validateId,
  valitadeDataMiddleware(userSchemaReq),
  validateToken
);
userRoutes.delete("/:id", validateId, validateToken, deleteUsersController);

export default userRoutes;
