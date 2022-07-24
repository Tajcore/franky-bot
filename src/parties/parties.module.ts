import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './parties.entity';

@Module({ imports: [TypeOrmModule.forFeature([Party])] })
export class PartiesModule {}
