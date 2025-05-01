import { faker } from '@faker-js/faker';
import type { Comment, Event, PrismaClient, User } from '@prisma/client';

import { SEED_CONFIG } from '../config';
import type { CommentCreateData } from '../types';
import { getRandomDate, getRandomInt, getRandomItem } from '../utils/helpers';

// Seed comments using createMany
export async function seedComments(
  prisma: PrismaClient,
  users: User[],
  events: Event[],
): Promise<Comment[]> {
  console.log('Creating comments for events...');

  const commentCreateData: CommentCreateData[] = [];
  const commentMap = new Map<string, Comment>();

  // Process events in batches
  const batchSize = 20;

  for (
    let eventIndex = 0;
    eventIndex < events.length;
    eventIndex += batchSize
  ) {
    const eventBatch = events.slice(eventIndex, eventIndex + batchSize);

    for (const event of eventBatch) {
      // Skip some events to create the edge case of events with no comments
      if (Math.random() < 0.3) continue;

      const commentCount = getRandomInt(
        SEED_CONFIG.commentsPerEvent.min,
        SEED_CONFIG.commentsPerEvent.max,
      );

      // Create primary comments data
      for (let i = 0; i < commentCount; i++) {
        const user = getRandomItem(users);

        commentCreateData.push({
          content: faker.lorem.sentences(getRandomInt(1, 3)),
          userId: user.id,
          eventId: event.id,
          createdAt: getRandomDate(new Date(event.publishDate), new Date()),
        });
      }
    }
  }

  // Create primary comments in batches
  const primaryComments: Comment[] = [];
  const primaryCommentBatchSize = 100;

  for (let i = 0; i < commentCreateData.length; i += primaryCommentBatchSize) {
    const batch = commentCreateData.slice(i, i + primaryCommentBatchSize);
    const createdComments = await Promise.all(
      batch.map((commentData) =>
        prisma.comment.create({
          data: commentData,
        }),
      ),
    );
    primaryComments.push(...createdComments);

    // Store comments in map for easy lookup when creating replies
    createdComments.forEach((comment) => {
      commentMap.set(comment.id, comment);
    });
  }

  // Create replies to some comments
  const replyCreateData: CommentCreateData[] = [];

  for (const comment of primaryComments) {
    // Skip some comments to create the edge case of comments with no replies
    if (Math.random() < 0.6) continue;

    const replyCount = getRandomInt(0, 3);

    for (let i = 0; i < replyCount; i++) {
      const user = getRandomItem(users);

      replyCreateData.push({
        content: faker.lorem.sentences(getRandomInt(1, 2)),
        userId: user.id,
        eventId: comment.eventId as string,
        parentId: comment.id,
        createdAt: getRandomDate(new Date(comment.createdAt), new Date()),
      });
    }
  }

  // Create reply comments in batches
  const replyComments: Comment[] = [];
  const replyBatchSize = 100;

  for (let i = 0; i < replyCreateData.length; i += replyBatchSize) {
    const batch = replyCreateData.slice(i, i + replyBatchSize);
    const createdReplies = await Promise.all(
      batch.map((replyData) =>
        prisma.comment.create({
          data: replyData,
        }),
      ),
    );
    replyComments.push(...createdReplies);
  }

  const allComments = [...primaryComments, ...replyComments];
  console.log(`Created ${allComments.length} comments`);
  return allComments;
}
