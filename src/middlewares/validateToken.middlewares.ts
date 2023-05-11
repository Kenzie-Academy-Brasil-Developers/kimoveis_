import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../error";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const authToken = req.headers.authorization;

  if (!authToken || authToken?.length === 6) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = authToken.split(" ")[1];

  const decoded: any = verify(
    token,
    String(process.env.SECRET_KEY),
    (error: any, decoded: any) => {
      if (error) throw new AppError(error.message, 401);

      res.locals.dataToken = {
        admin: decoded?.admin,
        id: decoded?.sub,
      };
    }
  );

  return next();
};
