import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Faction } from "./faction.entity";

@Entity("party", { schema: "onepiece" })
export class Party {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @OneToOne(() => User, (user) => user.party, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "leaderId", referencedColumnName: "id" }])
  leader!: User;

  @ManyToOne(() => Faction, (faction) => faction.parties, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "factionId", referencedColumnName: "id" }])
  faction!: Faction;

  @OneToMany(() => User, (user) => user.party2)
  users!: User[];
}
