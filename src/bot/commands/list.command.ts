import { TransformPipe } from '@discord-nestjs/common';
import {
  Command,
  DiscordTransformedCommand,
  Payload,
  TransformedCommandExecutionContext,
  UsePipes,
} from '@discord-nestjs/core';
import { UsersService } from 'src/users/users.service';
import { BotService } from '../bot.service';

import { ListDto } from '../dto/list.dto';

@Command({
  name: 'list-users',
  description: 'Lists all users',
})
@UsePipes(TransformPipe)
export class ListCommand implements DiscordTransformedCommand<ListDto> {
  constructor(
    private readonly userService: UsersService,
    private readonly botService: BotService,
  ) {}
  async handler(
    @Payload() dto: ListDto,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<string> {
    console.log('DTO', dto);
    console.log('Interaction', interaction);
    // Get all users by faction
    const users = await this.userService.findAll({
      faction: dto.faction || '',
    });

    return `List of All Users\n----------------------------------------\n${
      dto.faction ? `(${dto.faction})` : ''
    }${users
      .map(
        (user) => `\`${user.tag} - ${user.faction.name} - ${user.rank.name}\``,
      )
      .join('\n')}\n----------------------------------------`;
  }
}
