import {
  type Comment,
  type PrismaClient,
  ReactionType,
  type User,
} from '@prisma/client';

import { SEED_CONFIG } from '../config';
import type { ReactionCreateData } from '../types';
import { getRandomEnum, getRandomInt, getRandomItems } from '../utils/helpers';

// Seed reactions using createMany
export async function seedReactions(
  prisma: PrismaClient,
  users: User[],
  comments: Comment[],
): Promise<void> {
  console.log('Creating reactions for comments...');

  const reactionCreateData: ReactionCreateData[] = [];

  for (const comment of comments) {
    // Skip some comments to create the edge case of comments with no reactions
    if (Math.random() < 0.4) continue;

    const reactionCount = getRandomInt(
      SEED_CONFIG.reactionsPerComment.min,
      SEED_CONFIG.reactionsPerComment.max,
    );

    // Get random users to react
    const reactingUsers = getRandomItems(users, 0, reactionCount);

    for (const user of reactingUsers) {
      reactionCreateData.push({
        type: getRandomEnum(ReactionType),
        userId: user.id,
        commentId: comment.id,
      });
    }
  }

  // Use createMany to insert all reactions at once
  if (reactionCreateData.length > 0) {
    await prisma.reaction.createMany({
      data: reactionCreateData,
      skipDuplicates: true, // Skip duplicate user-comment combinations
    });
  }

  console.log(`Created ${reactionCreateData.length} reactions`);
}
