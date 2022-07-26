import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rank } from '../entity/onepiece/ranks.entity';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(Rank)
    private readonly ranksRepository: Repository<Rank>,
  ) {}

  async findAll(): Promise<Rank[]> {
    return this.ranksRepository.find();
  }

  async findOne(name: string): Promise<Rank | null> {
    return this.ranksRepository.findOne({ where: [{ name: name }] });
  }

  async create(rank: Rank): Promise<Rank> {
    return this.ranksRepository.save(rank);
  }
}
