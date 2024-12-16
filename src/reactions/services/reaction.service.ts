import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionService {
  // Process and validate reaction data (can be extended for more complex logic)
  processReaction(reaction: string): string {
    return reaction.toUpperCase(); // Example: convert to uppercase
  }
}
