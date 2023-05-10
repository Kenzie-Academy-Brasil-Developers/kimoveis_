import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  listUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import validateEmail from "../middlewares/validateEmail.middlewares";
import { validateId } from "../middlewares/validateId.middlewares";
import { validateToken } from "../middlewares/validateToken.middlewares";
import validateData from "../middlewares/valitadeData.middlewares";
import { userSchemaReq, userSchemaReqUpdate } from "../schemas/user.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateData(userSchemaReq),
  validateEmail,
  createUsersController
);
userRoutes.get("", validateToken, listUsersController);
userRoutes.patch(
  "/:id",
  validateData(userSchemaReqUpdate),
  validateId,
  validateToken,
  updateUsersController
);
userRoutes.delete("/:id", validateId, validateToken, deleteUsersController);

export default userRoutes;
