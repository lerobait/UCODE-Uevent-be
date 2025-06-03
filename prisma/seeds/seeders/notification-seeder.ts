import { faker } from '@faker-js/faker';
import type { Company, Event, PrismaClient, User } from '@prisma/client';

import { SEED_CONFIG } from '../config';
import type { NotificationCreateData } from '../types';
import { getRandomDate, getRandomInt, getRandomItem } from '../utils/helpers';

// Seed notifications using createMany
export async function seedNotifications(
  prisma: PrismaClient,
  users: User[],
  events: Event[],
  companies: Company[],
): Promise<void> {
  console.log('Creating notifications...');

  const notificationCreateData: NotificationCreateData[] = [];

  // Create different types of notifications
  const notificationTypes = [
    'EVENT_REMINDER',
    'TICKET_PURCHASE',
    'NEW_COMMENT',
    'COMMENT_REPLY',
    'EVENT_UPDATE',
    'COMPANY_UPDATE',
    'EVENT_DELETE',
    'NEW_EVENT_ATTENDEE',
  ];

  for (const user of users) {
    // Skip some users to create the edge case of users with no notifications
    if (Math.random() < 0.1) continue;

    const notificationCount = getRandomInt(
      SEED_CONFIG.notificationsPerUser.min,
      SEED_CONFIG.notificationsPerUser.max,
    );

    for (let i = 0; i < notificationCount; i++) {
      const type = getRandomItem(notificationTypes);
      let title: string;
      let content: string;
      let link: string | undefined;
      let sentById: string | undefined;

      // Create different notification content based on type
      switch (type) {
        case 'EVENT_REMINDER': {
          const event = getRandomItem(events);
          title = `Reminder: ${event.title}`;
          content = `Don't forget about "${event.title}" tomorrow!`;
          link = `/events/${event.id}`;
          break;
        }
        case 'TICKET_PURCHASE': {
          const event = getRandomItem(events);
          title = 'Ticket Purchased';
          content = `You successfully purchased a ticket for "${event.title}"`;
          link = `/users/${user.id}/tickets`;
          break;
        }
        case 'NEW_COMMENT': {
          const event = getRandomItem(events);
          const sender = getRandomItem(users);
          title = `New comment on ${event.title}`;
          content = `${sender.name} commented: "${faker.lorem.sentence()}"`;
          link = `/events/${event.id}#comments`;
          sentById = sender.id;
          break;
        }
        case 'COMMENT_REPLY': {
          const sender = getRandomItem(users);
          title = 'New reply to your comment';
          content = `${sender.name} replied: "${faker.lorem.sentence()}"`;
          // Fix: Access event id safely
          const randomEvent = getRandomItem(events);
          link = randomEvent ? `/events/${randomEvent.id}#comments` : undefined;
          sentById = sender.id;
          break;
        }
        case 'EVENT_UPDATE': {
          const event = getRandomItem(events);
          const company = companies.find((c) => c.id === event.companyId);
          if (!company) continue; // Skip if company not found
          title = `${company.name} Updated Event`;
          content = `${company.name} just updated: "${event.title}"`;
          link = `/events/${event.id}`;
          sentById = company.ownerId;
          break;
        }
        case 'COMPANY_UPDATE': {
          const company = getRandomItem(companies);
          title = `${company.name} News`;
          content = `${company.name} just published: "${faker.company.catchPhrase()}"`;
          link = `/companies/${company.id}/news`;
          sentById = company.ownerId;
          break;
        }
        case 'EVENT_DELETE': {
          const company = getRandomItem(companies);
          title = `${company.name} Event Cancelled`;
          content = `The event "${faker.company.catchPhrase()}" has been cancelled.`;
          sentById = company.ownerId;
          break;
        }
        case 'NEW_EVENT_ATTENDEE': {
          const event = getRandomItem(events);
          const attendee = getRandomItem(users);
          title = 'New attendee of the event';
          content = `${attendee.name} joined the event "${event.title}"`;
          link = `/events/${event.id}#attendees`;
          sentById = attendee.id;
          break;
        }
      }

      notificationCreateData.push({
        type,
        title,
        content,
        link,
        isRead: Math.random() < 0.5,
        createdAt: getRandomDate(
          new Date(new Date().setDate(new Date().getDate() - 30)),
          new Date(),
        ),
        userId: user.id,
        sentById,
      });
    }
  }

  // Create notifications in batches for better performance
  const batchSize = 100;

  for (let i = 0; i < notificationCreateData.length; i += batchSize) {
    const batch = notificationCreateData.slice(i, i + batchSize);
    await Promise.all(
      batch.map((notificationData) =>
        prisma.notification.create({
          data: notificationData,
        }),
      ),
    );
  }

  console.log(`Created ${notificationCreateData.length} notifications`);
}
