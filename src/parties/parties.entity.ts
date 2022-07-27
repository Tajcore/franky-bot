import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../users/users.entity';
import { Faction } from '../factions/factions.entity';

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @OneToOne(() => User)
  @JoinColumn()
  leader!: User;
  @ManyToOne(() => Faction, (faction) => faction.parties)
  faction!: Faction;
  @OneToMany(() => User, (user: User) => user.party)
  users!: User[];
}
