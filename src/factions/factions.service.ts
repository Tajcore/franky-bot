import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faction } from './factions.entity';

@Injectable()
export class FactionsService {
  constructor(
    @InjectRepository(Faction)
    private readonly factionRepository: Repository<Faction>,
  ) {}

  async findAll(): Promise<Faction[]> {
    return this.factionRepository.find();
  }

  async findOne(name: string): Promise<Faction | null> {
    return this.factionRepository.findOne({ where: [{ name: name }] });
  }

  async create(faction: Faction): Promise<Faction> {
    return this.factionRepository.save(faction);
  }
}
