import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule } from "../../entities";
import { AppError } from "../../error";
import { TSchedulesRequest } from "../../interfaces/schedules.interfaces";

const createSchedulesServices = async (
  payload: TSchedulesRequest,
  userId: number
): Promise<Schedule> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const { date, hour, realEstateId } = payload;

  // console.log(userId);

  const isSameDateTimeUserExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.userId = :userId", { userId })
    .getCount();

  if (isSameDateTimeUserExists > 0) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const isSameDateTimeExists = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date })
    .andWhere("schedule.hour = :hour", { hour })
    .andWhere("schedule.realEstateId = :realEstateId", { realEstateId })
    .getCount();

  if (isSameDateTimeExists > 0) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const realEstate = await realEstateRepository.findOne({
    where: {
      id: realEstateId,
    },
    relations: {
      address: true,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const dateObj = new Date(date);
  if (dateObj.getDay() === 0 || dateObj.getDay() === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
  if (hour < "08:00" || hour > "18:00") {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const newschedule: Schedule = new Schedule();
  newschedule.date = date;
  newschedule.hour = hour;
  newschedule.realEstate = realEstate;

  const schedule: Schedule = scheduleRepository.create(newschedule);
  await scheduleRepository.save(schedule);

  return schedule;
};

export { createSchedulesServices };
