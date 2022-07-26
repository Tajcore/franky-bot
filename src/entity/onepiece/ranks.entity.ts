import { Faction } from './factions.entity';
import { User } from './users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Rank {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @ManyToOne(() => Faction, (faction) => faction.ranks)
  faction!: Faction;

  @OneToMany(() => User, (user) => user.rank)
  users!: User[];
}
