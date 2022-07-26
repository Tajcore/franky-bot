import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { BotModule } from './bot/bot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RanksModule } from './ranks/ranks.module';
import { FactionsModule } from './factions/factions.module';
import { PartiesModule } from './parties/parties.module';
import { loggerOptions, configuration } from './config';

@Module({
  imports: [

    LoggerModule.forRoot(loggerOptions),
    // Configuration
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Database
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        ...await config.get('db'),
      }),
      inject: [ConfigService],
    }),
    
   


    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          token: configService.get('TOKEN'),
          discordClientOptions: {
            intents: [
              GatewayIntentBits.Guilds,
              GatewayIntentBits.GuildMessages,
              GatewayIntentBits.GuildMessageReactions,
              GatewayIntentBits.GuildMembers,
            ],
            partials: [
              Partials.Channel,
              Partials.Message,
              Partials.GuildMember,
              Partials.Reaction,
              Partials.User,
            ],
          },
          registerCommandOptions: [
            {
              forGuild: configService.get('GUILD_ID_WITH_COMMANDS'),
              removeCommandsBefore: true,
            },
          ],
        } as DiscordModuleOption),
      inject: [ConfigService],
    }),

    BotModule,
    UsersModule,
    RanksModule,
    FactionsModule,
    PartiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
