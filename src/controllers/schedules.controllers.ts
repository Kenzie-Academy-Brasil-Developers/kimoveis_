import { Request, Response } from "express";
import { TSchedulesRequest } from "../interfaces/schedules.interfaces";
import { createSchedulesServices } from "../services/schedules/createSchedules.services";
import listSchedulesService from "../services/schedules/listSchedules.services";

const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const payload: TSchedulesRequest = req.body;
  const userId: number = res.locals.dataToken.id;

  await createSchedulesServices(payload, userId);

  return res.status(201).json({ message: "Schedule created" });
};

const listSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);
  const isAdmin: boolean = res.locals.dataToken.admin;

  const schedules = await listSchedulesService(isAdmin, id);

  return res.json(schedules);
};

export { createSchedulesController, listSchedulesController };
