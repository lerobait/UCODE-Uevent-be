import { faker } from '@faker-js/faker';
import type {
  Comment,
  Company,
  CompanyNews,
  PrismaClient,
  User,
} from '@prisma/client';
import { ReactionType } from '@prisma/client';

import { SEED_CONFIG } from '../config';
import { imageGenerators } from '../generators';
import type { CommentCreateData, ReactionCreateData } from '../types';
import {
  getRandomDate,
  getRandomEnum,
  getRandomInt,
  getRandomItem,
  getRandomItems,
} from '../utils/helpers';

// Seed company news using createMany
export async function seedCompanyNews(
  prisma: PrismaClient,
  companies: Company[],
): Promise<CompanyNews[]> {
  console.log('Creating company news...');

  const newsCreateData = [];
  let newsIndex = 0;

  for (const company of companies) {
    // Skip some companies to create the edge case of companies with no news
    if (Math.random() < 0.2) continue;

    const newsCount = getRandomInt(
      SEED_CONFIG.newsPerCompany.min,
      SEED_CONFIG.newsPerCompany.max,
    );

    for (let i = 0; i < newsCount; i++) {
      const title = faker.company.catchPhrase();
      const content = faker.lorem.paragraphs(getRandomInt(2, 5));

      newsCreateData.push({
        title,
        content,
        imageUrl: imageGenerators.newsImage(newsIndex++),
        companyId: company.id,
        createdAt: getRandomDate(new Date(company.createdAt), new Date()),
      });
    }
  }

  // Create news in batches for better performance
  const batchSize = 50;
  const news: CompanyNews[] = [];

  for (let i = 0; i < newsCreateData.length; i += batchSize) {
    const batch = newsCreateData.slice(i, i + batchSize);
    const createdNews = await Promise.all(
      batch.map((newsData) =>
        prisma.companyNews.create({
          data: newsData,
        }),
      ),
    );
    news.push(...createdNews);
  }

  console.log(`Created ${news.length} company news items`);
  return news;
}

// Seed news comments using createMany
export async function seedNewsComments(
  prisma: PrismaClient,
  users: User[],
  news: CompanyNews[],
): Promise<Comment[]> {
  console.log('Creating comments for company news...');

  const commentCreateData: CommentCreateData[] = [];

  // Process news in batches
  const batchSize = 20;

  for (let newsIndex = 0; newsIndex < news.length; newsIndex += batchSize) {
    const newsBatch = news.slice(newsIndex, newsIndex + batchSize);

    for (const newsItem of newsBatch) {
      // Skip some news to create the edge case of news with no comments
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
          companyNewsId: newsItem.id,
          createdAt: getRandomDate(new Date(newsItem.createdAt), new Date()),
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
        companyNewsId: comment.companyNewsId as string,
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
  console.log(`Created ${allComments.length} news comments`);
  return allComments;
}

// Seed news reactions using createMany
export async function seedNewsReactions(
  prisma: PrismaClient,
  users: User[],
  comments: Comment[],
): Promise<void> {
  console.log('Creating reactions for news comments...');

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

  console.log(`Created ${reactionCreateData.length} news reactions`);
}
