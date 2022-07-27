import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Party } from "./party.entity";
import { Rank } from "./rank.entity";
import { User } from "./user.entity";

@Entity("faction", { schema: "onepiece" })
export class Faction {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "name", length: 255 })
  name!: string;

  @OneToMany(() => Party, (party) => party.faction)
  parties!: Party[];

  @OneToMany(() => Rank, (rank) => rank.faction)
  ranks!: Rank[];

  @OneToMany(() => User, (user) => user.faction)
  users!: User[];
}
