import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { Schedule } from "./schedules.entities";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 45 })
  name: string;

  @Column("varchar", { length: 45, unique: true })
  email: string;

  @Column({ default: false })
  admin: boolean;

  @Column("varchar", { length: 120 })
  password: string;

  @CreateDateColumn()
  createdAt?: string | Date;

  @UpdateDateColumn()
  updatedAt?: string | Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: string | Date | null | undefined;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule[];
}

export { User };
