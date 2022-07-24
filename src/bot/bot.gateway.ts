import { Injectable, Logger } from '@nestjs/common';
import { Once, InjectDiscordClient, On } from '@discord-nestjs/core';
import { Client, MessageReaction, TextChannel, User } from 'discord.js';
import { UsersService } from 'src/users/users.service';
import { FactionsService } from 'src/factions/factions.service';
import { RanksService } from 'src/ranks/ranks.service';
import { User as UserEntity } from 'src/users/users.entity';
import { Faction } from 'src/factions/factions.entity';
import { Rank } from 'src/ranks/ranks.entity';
// tslint:disable-next-line
@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly userService: UsersService,
    private readonly factionService: FactionsService,
    private readonly rankService: RanksService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user?.tag} connected!`);
  }

  @On('messageReactionAdd')
  async onMessageReactionAdd(reaction: MessageReaction, user: User) {
    this.logger.log(reaction.emoji.identifier, user.tag);
    if (user.bot) return;
    const userEntity = await this.userService.findOne(user.tag);

    if (userEntity) {
      this.logger.log(`User already exists: ${user.tag}`);
      reaction.users.remove(user);
      return;
    }
    switch (reaction.emoji.identifier) {
      case '%F0%9F%8E%8C':
        //Create User as Marine

        const marine = (await this.factionService.findOne('Marine')) as Faction;
        const marineRank = (await this.rankService.findOne('Rookie')) as Rank;
        const userEntity = new UserEntity();
        userEntity.faction = marine;
        userEntity.rank = marineRank;
        userEntity.tag = user.tag;
        userEntity.reputation = 0;
        await this.userService.create(userEntity);
        (
          this.client.channels.cache.get('998748656817688586') as TextChannel
        ).send(`${user.tag} has joined the Marine faction!`);
        break;
      case '%F0%9F%8F%B4%E2%80%8D%E2%98%A0%EF%B8%8F':
        const pirate = (await this.factionService.findOne('Pirate')) as Faction;
        const pirateRank = (await this.rankService.findOne('Rookie')) as Rank;
        const userEntity2 = new UserEntity();
        userEntity2.faction = pirate;
        userEntity2.rank = pirateRank;
        userEntity2.tag = user.tag;
        userEntity2.reputation = 0;
        await this.userService.create(userEntity2);
        (
          this.client.channels.cache.get('998748656817688586') as TextChannel
        ).send(`${user.tag} has joined the Pirate faction!`);
        break;
      default:
        return;
    }
  }
}
