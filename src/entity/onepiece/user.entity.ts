import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Party } from "./party.entity";
import { Faction } from "./faction.entity";
import { Rank } from "./rank.entity";

@Entity("user", { schema: "onepiece" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "tag", length: 255 })
  tag!: string;

  @Column("int", { name: "reputation" })
  reputation!: number;

  @OneToOne(() => Party, (party) => party.leader)
  party!: Party;

  @ManyToOne(() => Party, (party) => party.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "partyId", referencedColumnName: "id" }])
  party2!: Party;

  @ManyToOne(() => Faction, (faction) => faction.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "factionId", referencedColumnName: "id" }])
  faction!: Faction;

  @ManyToOne(() => Rank, (rank) => rank.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "rankId", referencedColumnName: "id" }])
  rank!: Rank;
}
