import { WebSocketGateway, OnGatewayInit, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ReactionService } from '../services/reaction.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
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

  // Connection handling
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  // Disconnection handling
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendReaction')
  handleReaction(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket
  ): void {
    this.logger.log(`Received raw message: ${JSON.stringify(body)}`);

    try {
      const reaction = body.reaction || body;

      if (!reaction) {
        this.logger.warn('No reaction provided');
        return;
      }

      const processedReaction = this.reactionService.processReaction(reaction);
      
      // Broadcast to all clients
      this.server.emit('receiveReaction', { 
        reaction: processedReaction,
       });

      this.logger.log(`Reaction processed: ${processedReaction}`);
    } catch (error) {
      this.logger.error('Reaction processing failed', error);
      client.emit('error', { message: 'Failed to process reaction' });
    }
  }
}