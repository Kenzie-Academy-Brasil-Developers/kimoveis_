import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./addresses.entities";
import { Category } from "./categories.entities";
import { Schedule } from "./schedules.entities";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ default: false })
  sold: boolean;

  @Column("decimal", { precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt?: string | Date;

  @UpdateDateColumn()
  updatedAt?: string | Date;

  @OneToOne(() => Address, (address) => address.realEstate)
  address: Address;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedule: Schedule[];

  @ManyToOne(() => Category, (category) => category.realEstate)
  category: Category;
}

export { RealEstate };
