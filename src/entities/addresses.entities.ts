import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RealEstate } from "./realEstate.entities";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 45 })
  street: string;

  @Column("varchar", { length: 8 })
  zipCode: string;

  @Column("varchar", { length: 7, nullable: true })
  number: string | null | undefined;

  @Column("varchar", { length: 20 })
  city: string;

  @Column("varchar", { length: 2 })
  state: string;

  @OneToOne(() => RealEstate, (realEstate) => realEstate.address)
  @JoinColumn()
  realEstate: RealEstate;
}

export { Address };
