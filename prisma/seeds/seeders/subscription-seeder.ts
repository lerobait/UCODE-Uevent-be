import type { Company, Event, PrismaClient, User } from '@prisma/client';

import { SEED_CONFIG } from '../config';
import { getRandomInt, getRandomItems } from '../utils/helpers';

// Seed event subscriptions using createMany
export async function seedEventSubscriptions(
  prisma: PrismaClient,
  users: User[],
  events: Event[],
): Promise<void> {
  console.log('Creating event subscriptions...');

  const subscriptionData = [];

  for (const user of users) {
    // Skip some users to create the edge case of users with no subscriptions
    if (Math.random() < 0.1) continue;

    // Get a random number of events to subscribe to
    const subscriptionCount = getRandomInt(
      0,
      Math.min(SEED_CONFIG.subscriptionsPerUser.max, events.length),
    );

    // Get random events
    const eventsToSubscribe = getRandomItems(events, 0, subscriptionCount);

    for (const event of eventsToSubscribe) {
      subscriptionData.push({
        userId: user.id,
        eventId: event.id,
      });
    }
  }

  // Use createMany to insert all subscriptions at once
  if (subscriptionData.length > 0) {
    await prisma.eventSubscription.createMany({
      data: subscriptionData,
      skipDuplicates: true, // Skip duplicate user-event combinations
    });
  }

  console.log(`Created ${subscriptionData.length} event subscriptions`);
}

// Seed company subscriptions using createMany
export async function seedCompanySubscriptions(
  prisma: PrismaClient,
  users: User[],
  companies: Company[],
): Promise<void> {
  console.log('Creating company subscriptions...');

  const subscriptionData = [];

  for (const user of users) {
    // Skip some users to create the edge case of users with no subscriptions
    if (Math.random() < 0.1) continue;

    // Get a random number of companies to subscribe to
    const subscriptionCount = getRandomInt(
      0,
      Math.min(SEED_CONFIG.subscriptionsPerUser.max, companies.length),
    );

    // Get random companies
    const companiesToSubscribe = getRandomItems(
      companies,
      0,
      subscriptionCount,
    );

    for (const company of companiesToSubscribe) {
      subscriptionData.push({
        userId: user.id,
        companyId: company.id,
      });
    }
  }

  // Use createMany to insert all subscriptions at once
  if (subscriptionData.length > 0) {
    await prisma.companySubscription.createMany({
      data: subscriptionData,
      skipDuplicates: true, // Skip duplicate user-company combinations
    });
  }

  console.log(`Created ${subscriptionData.length} company subscriptions`);
}
