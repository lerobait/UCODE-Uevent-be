import { faker } from '@faker-js/faker';
import {
  type Company,
  type Event,
  EventFormatType,
  EventThemeType,
  type PrismaClient,
} from '@prisma/client';

import { SEED_CONFIG } from '../config';
import { imageGenerators } from '../generators';
import type { EventCreateData } from '../types';
import {
  getRandomEnum,
  getRandomEventDate,
  getRandomInt,
  getRandomItem,
  getRandomItems,
} from '../utils/helpers';
import { logger } from '../utils/logger';
import { seedLocations } from './location-seeder';

// Update the seedEvents function to use event locations
export async function seedEvents(
  prisma: PrismaClient,
  companies: Company[],
): Promise<Event[]> {
  logger.startOperation('Creating events');

  const eventCreateData: EventCreateData[] = [];
  let eventIndex = 0;
  const usedLocationIds = new Set<string>();
  let totalEventsToCreate = 0;

  // Calculate approximately how many events we'll create
  companies.forEach(() => {
    if (Math.random() >= 0.1) {
      // 90% of companies will have events
      totalEventsToCreate += getRandomInt(
        SEED_CONFIG.eventsPerCompany.min,
        SEED_CONFIG.eventsPerCompany.max,
      );
    }
  });

  logger.info(
    `Planning to create approximately ${totalEventsToCreate} events...`,
  );
  const eventLocations = await seedLocations(prisma, totalEventsToCreate);
  let eventsCreated = 0;

  // For each company, create a random number of events
  for (const company of companies) {
    // Skip some companies to create the edge case of companies with no events
    if (Math.random() < 0.1) continue;

    const eventCount = getRandomInt(
      SEED_CONFIG.eventsPerCompany.min,
      SEED_CONFIG.eventsPerCompany.max,
    );

    for (let i = 0; i < eventCount; i++) {
      // Generate event data
      const title = faker.company.catchPhrase();
      const description = faker.lorem.paragraphs(3);

      // Get a random date between a year ago and 2 years ahead
      const startDate = getRandomEventDate();

      // End date is a few hours after start date
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + getRandomInt(1, 8));

      // Publish date is before start date
      const publishDate = new Date(startDate);
      publishDate.setDate(startDate.getDate() - getRandomInt(14, 60));

      // Ensure publish date isn't in the future for most events (except scheduled ones)
      const now = new Date();
      if (Math.random() > 0.2 && publishDate > now) {
        publishDate.setTime(
          now.getTime() - getRandomInt(1, 7) * 24 * 60 * 60 * 1000,
        );
      }

      // Determine if it's a free or paid event
      const price =
        Math.random() < 0.3
          ? 0
          : Number.parseFloat((Math.random() * 200 + 10).toFixed(2));

      // Set max attendees for some events
      const maxAttendees = Math.random() < 0.7 ? getRandomInt(20, 1000) : null;

      // Generate Stripe product and price IDs for paid events with verified companies
      let stripeProductId: string | null = null;
      let stripePriceId: string | null = null;

      if (price > 0 && company.isVerified && company.stripeAccountId) {
        stripeProductId = `prod_${faker.string.alphanumeric(14)}`;
        stripePriceId = `price_${faker.string.alphanumeric(14)}`;
      }

      // Generate poster image
      const posterUrl = imageGenerators.eventPoster(eventIndex++);

      // Determine if this should be a virtual event or have a location
      let locationId: string | null = null;

      if (Math.random() < 0.8) {
        // 80% of events have a location
        const availableLocations = eventLocations.filter(
          (loc) => !usedLocationIds.has(loc.id),
        );

        if (availableLocations.length > 0) {
          const location = getRandomItem(availableLocations);
          locationId = location.id;
          usedLocationIds.add(location.id);
        } else {
          logger.info(
            'No more available event locations. Creating virtual event instead.',
          );
        }
      }

      eventCreateData.push({
        title,
        description,
        posterUrl,
        startDate,
        endDate,
        publishDate,
        price,
        maxAttendees,
        showAttendeeList: Math.random() > 0.2,
        notifyOnNewAttendee: Math.random() > 0.5,
        format: getRandomEnum(EventFormatType),
        themes: getRandomItems(Object.values(EventThemeType), 1, 3),
        stripeProductId,
        stripePriceId,
        companyId: company.id,
        creatorId: company.ownerId,
        locationId,
      });

      eventsCreated++;

      // Show progress periodically
      if (eventsCreated > 0 && eventsCreated % 50 === 0) {
        logger.progress(eventsCreated, totalEventsToCreate, 'Events generated');
      }
    }
  }

  // Create events in batches for better performance
  const batchSize = 50;
  const events: Event[] = [];
  logger.info(
    `Creating ${eventCreateData.length} events in batches of ${batchSize}...`,
  );

  for (let i = 0; i < eventCreateData.length; i += batchSize) {
    const batch = eventCreateData.slice(i, i + batchSize);
    logger.progress(i, eventCreateData.length, 'Creating events');

    const createdEvents = await Promise.all(
      batch.map((eventData) =>
        prisma.event.create({
          data: {
            ...eventData,
            themes: {
              set: eventData.themes,
            },
          },
        }),
      ),
    );
    events.push(...createdEvents);
  }

  logger.completeOperation(
    'Creating events',
    `${events.length} events created`,
  );
  return events;
}
