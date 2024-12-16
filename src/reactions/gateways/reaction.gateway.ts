import { WebSocketGateway, OnGatewayInit, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ReactionService } from '../services/reaction.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ 
  namespace: '/reactions',
  cors: {
    origin: '*',  
    methods: ['GET', 'POST']
  }
})
export class ReactionGateway implements OnGatewayInit {
  private readonly logger = new Logger(ReactionGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(private readonly reactionService: ReactionService) {}

  afterInit() {
    this.logger.log('WebSocket Gateway Initialized');
  }

  @SubscribeMessage('sendReaction')
  handleReaction(@MessageBody() reaction: string): void {
    try {
      const processedReaction = this.reactionService.processReaction(reaction);
      this.server.emit('receiveReaction', processedReaction);
    } catch (error) {
      this.logger.error('Error processing reaction', error);
    }
  }
}