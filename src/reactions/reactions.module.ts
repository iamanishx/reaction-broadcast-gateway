import { Module } from '@nestjs/common';
import { ReactionGateway } from './gateways/reaction.gateway';
import { ReactionService } from './services/reaction.service';

@Module({
  providers: [ReactionGateway, ReactionService],
})
export class ReactionsModule {}
