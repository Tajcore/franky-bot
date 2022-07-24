import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository, Like } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(options: { faction: string }): Promise<User[]> {
    const { faction = '' } = options;
    return this.usersRepository.find({
      where: [
        {
          faction: {
            name: Like(`${faction}%`),
          },
        },
      ],
      relations: ['faction', 'rank'],
      order: {
        faction: {
          name: 'ASC',
        },
      },
    } as FindManyOptions<User>);
  }

  async findOne(tag: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ tag: tag }],
    } as FindOneOptions<User>);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
