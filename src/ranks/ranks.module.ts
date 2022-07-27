import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from './ranks.entity';
import { RanksService } from './ranks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rank])],
  providers: [RanksService],
  exports: [RanksService],
})
export class RanksModule {}
