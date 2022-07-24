import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule, DiscordModuleOption } from '@discord-nestjs/core';
import { GatewayIntentBits, Partials } from 'discord.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotModule } from './bot/bot.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RanksModule } from './ranks/ranks.module';
import { FactionsModule } from './factions/factions.module';
import { PartiesModule } from './parties/parties.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT as string) || 3309,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        migrations: [__dirname + '/**/*{.ts,.js}'],
        migrationsTableName: 'franky_bot_migrations_table',
        cli: {
          migrationsDir: 'migrations',
        },
        logging: true,
      }),
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
