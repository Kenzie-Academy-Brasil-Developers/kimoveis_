import { hashSync } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  UpdateDateColumn,
  BeforeInsert,
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

  @CreateDateColumn({ type: "date" })
  createdAt: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date | string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: string | Date | null | undefined;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule[];

  @BeforeInsert()
  passwordCrip() {
    this.password = hashSync(this.password, 10);
  }
}

export { User };
