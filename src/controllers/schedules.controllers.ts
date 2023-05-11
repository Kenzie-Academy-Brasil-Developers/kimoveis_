import { Request, Response } from "express";
import { TSchedulesRequest } from "../interfaces/schedules.interfaces";
import { createSchedulesServices } from "../services/schedules/createSchedules.services";

const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const payload: TSchedulesRequest = req.body;
  const userId: number = res.locals.dataToken.id;

  await createSchedulesServices(payload, userId);

  return res.status(201).json({ message: "Schedule created" });
};

export { createSchedulesController };
