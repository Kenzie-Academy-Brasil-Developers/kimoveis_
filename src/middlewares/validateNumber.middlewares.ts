import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AppError } from "../error";

const validateNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const payload = req.body;

  const number: string = payload.address.number;

  if (number) {
    const addressRepository: Repository<Address> =
      AppDataSource.getRepository(Address);
    const exists = await addressRepository.exist({
      where: { number: number },
    });
    if (exists) {
      return next(new AppError("Address already exists", 409));
    }
  }

  return next();
};

export default validateNumber;
