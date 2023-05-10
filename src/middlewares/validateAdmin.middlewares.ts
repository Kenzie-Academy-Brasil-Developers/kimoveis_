import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

export const validateIsAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = parseInt(req.params.id);
  const isAdmin = res.locals.adminToken.admin;
  const tokenId = parseInt(res.locals.adminToken.id);

  if (isAdmin === false && id === tokenId) {
    return next();
  }

  if (isAdmin === false && id !== tokenId) {
    throw new AppError("Insufficient Permission", 403);
  }

  return next();
};
