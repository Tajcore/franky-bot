import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from '../entity/onepiece/parties.entity';

@Module({ imports: [TypeOrmModule.forFeature([Party])] })
export class PartiesModule {}
