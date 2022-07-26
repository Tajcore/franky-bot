import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { UsersModule } from 'src/users/users.module';
import { FactionsModule } from 'src/factions/factions.module';
import { PartiesModule } from 'src/parties/parties.module';
import { RanksModule } from 'src/ranks/ranks.module';
import { ListCommand } from './commands/list.command';
import { BotService } from './bot.service';

@Module({
  imports: [
    DiscordModule.forFeature(),
    UsersModule,
    FactionsModule,
    RanksModule,
    PartiesModule,
  ],
  providers: [BotGateway, ListCommand,  BotService],
  exports: [BotService],
})
export class BotModule {}
