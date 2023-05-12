import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RealEstate } from "./realEstate.entities";
import { User } from "./users.entities";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => RealEstate)
  @JoinColumn()
  realEstate: RealEstate;
}

export { Schedule };
