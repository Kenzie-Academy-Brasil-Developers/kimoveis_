import { Request, Response } from "express";
import { TCategotyRequest } from "../interfaces/category.interfaces";
import createCategoriesServices from "../services/categories/createCategories.services";
import listCategoriesServices from "../services/categories/listCategories.services";

const createCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategotyRequest = req.body;
  const isAdmin = res.locals.dataToken.admin;

  const newCategory = await createCategoriesServices(categoryData, isAdmin);

  return res.status(201).json(newCategory);
};

const listCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await listCategoriesServices();

  return res.json(categories);
};

export { createCategoriesController, listCategoriesController };
