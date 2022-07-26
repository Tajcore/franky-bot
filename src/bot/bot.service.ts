import { InjectDiscordClient } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { Client, GuildMember } from 'discord.js';

@Injectable()
export class BotService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  async getUser(tag: string): Promise<GuildMember | undefined> {
    console.log(tag);
    const guild = await this.client.guilds.fetch('998747065536487425');
    const member = await guild.members.cache.get(tag);
    return member;
  }
}
