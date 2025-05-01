import { PrismaClient } from '@prisma/client';

import { seedComments } from './seeders/comment-seeder';
import { seedCompanies } from './seeders/company-seeder';
import { seedEvents } from './seeders/event-seeder';
import {
  seedCompanyNews,
  seedNewsComments,
  seedNewsReactions,
} from './seeders/news-seeder';
import { seedNotifications } from './seeders/notification-seeder';
import { seedPromoCodes } from './seeders/promo-code-seeder';
import { seedReactions } from './seeders/reaction-seeder';
import {
  seedCompanySubscriptions,
  seedEventSubscriptions,
} from './seeders/subscription-seeder';
import { seedTicketsAndAttendees } from './seeders/ticket-seeder';
import { seedUsers } from './seeders/user-seeder';
import { clearDatabase } from './utils/database';
import { logger } from './utils/logger';

const prisma = new PrismaClient();

async function main() {
  logger.section('DATABASE SEEDING');
  logger.startOperation('Database seeding');

  try {
    // Clear existing data
    await clearDatabase(prisma);

    // Create users (all verified as requested)
    const users = await seedUsers(prisma);

    // Create companies
    const companies = await seedCompanies(prisma, users);

    // Create events
    const events = await seedEvents(prisma, companies);

    // Create event subscriptions
    await seedEventSubscriptions(prisma, users, events);

    // Create company subscriptions
    await seedCompanySubscriptions(prisma, users, companies);

    // Create tickets and attendees
    await seedTicketsAndAttendees(prisma, users, events);

    // Create comments
    const comments = await seedComments(prisma, users, events);

    // Create reactions
    await seedReactions(prisma, users, comments);

    // Create company news
    const news = await seedCompanyNews(prisma, companies);

    // Create news comments
    const newsComments = await seedNewsComments(prisma, users, news);

    // Create news reactions
    await seedNewsReactions(prisma, users, newsComments);

    // Create promo codes
    await seedPromoCodes(prisma, companies);

    // Create notifications
    await seedNotifications(prisma, users, events, companies);

    logger.completeOperation(
      'Database seeding',
      'All data created successfully!',
    );
    logger.section('SUMMARY');
    logger.success(`Created ${users.length} users`);
    logger.success(`Created ${companies.length} companies`);
    logger.success(`Created ${events.length} events`);
    logger.success(`Created ${comments.length} comments`);
    logger.success(`Created ${news.length} news items`);
  } catch (error) {
    logger.error('Database seeding failed', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
main()
  .catch((e) => {
    logger.error('Unhandled error during seeding', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
