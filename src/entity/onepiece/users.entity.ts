import { Faction } from './factions.entity';
import { Party } from './parties.entity';
import { Rank } from './ranks.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tag!: string;

  @ManyToOne(() => Rank, (rank) => rank.users)
  rank!: Rank;

  @ManyToOne(() => Party, (party) => party.users)
  party?: Party;

  @ManyToOne(() => Faction, (faction) => faction.users)
  faction!: Faction;

  @Column()
  reputation!: number;
}
