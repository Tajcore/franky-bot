import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faction } from './factions.entity';
import { FactionsService } from './factions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Faction])],
  providers: [FactionsService],
  exports: [FactionsService],
})
export class FactionsModule {}
