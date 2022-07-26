import { Param } from '@discord-nestjs/core';
import { Transform } from 'class-transformer';

export class ListDto {
  @Transform(({ value }) => {
    if (value) {
      return value[0].toUpperCase() + value.toLowerCase().slice(1);
    }
  })
  @Param({
    name: 'faction',
    description: 'Either list all users by faction',
    required: false,
  })
  faction!: string;
}
