import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Faction } from "./faction.entity";
import { User } from "./user.entity";

@Entity("rank", { schema: "onepiece" })
export class Rank {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @Column("varchar", { name: "description", length: 255 })
  description!: string;

  @ManyToOne(() => Faction, (faction) => faction.ranks, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "factionId", referencedColumnName: "id" }])
  faction!: Faction;

  @OneToMany(() => User, (user) => user.rank)
  users!: User[];
}
