import { Request, Response } from "express";
import { TRealEstateRequest } from "../interfaces/realEstate.interfaces";
import createRealServices from "../services/realEstate/createReal.services";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TRealEstateRequest = req.body;
  const idCat: number = res.locals.categoryData.id;
  const nameCat: string = res.locals.categoryData.name;
  const isAdmin: boolean = res.locals.dataToken.admin;

  const newRealEstate = await createRealServices(
    payload,
    idCat,
    nameCat,
    isAdmin
  );

  return res.status(201).json(newRealEstate);
};

export { createRealEstateController };
