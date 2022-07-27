import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Rank } from '../ranks/ranks.entity';
import { Party } from '../parties/parties.entity';

@Entity()
export class Faction {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @OneToMany(() => User, (user) => user.faction)
  users!: User[];
  @OneToMany(() => Rank, (rank) => rank.faction)
  ranks!: Rank[];
  @OneToMany(() => Party, (party) => party.faction)
  parties!: Party[];
}
