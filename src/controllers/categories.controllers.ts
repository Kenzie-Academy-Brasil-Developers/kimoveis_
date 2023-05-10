import { Request, Response } from "express";
import { TCategotyRequest } from "../interfaces/category.interfaces";
import createCategoriesServices from "../services/categories/createCategories.services";

const createCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategotyRequest = req.body;
  const isAdmin = res.locals.dataToken.admin;

  const newCategory = await createCategoriesServices(categoryData, isAdmin);
  
  return res.status(201).json(newCategory);
};

export { createCategoriesController };
