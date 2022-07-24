import { Command, DiscordCommand } from '@discord-nestjs/core';
import { CommandInteraction, ApplicationCommandType } from 'discord.js';
import { Injectable } from '@nestjs/common';

@Command({
  name: 'playlist',
  description: 'Get current playlist',
  type: ApplicationCommandType.ChatInput,
})
@Injectable()
export class PlaylistCommand implements DiscordCommand {
  handler(interaction: CommandInteraction): string {
    return 'List with music...';
  }
}
