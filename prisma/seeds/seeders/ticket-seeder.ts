import { faker } from '@faker-js/faker';
import {
  type Event,
  PaymentStatusType,
  type PrismaClient,
  TicketStatusType,
  type User,
} from '@prisma/client';

import { getRandomInt, getRandomItems } from '../utils/helpers';

// Seed tickets and attendees
export async function seedTicketsAndAttendees(
  prisma: PrismaClient,
  users: User[],
  events: Event[],
): Promise<void> {
  console.log('Creating tickets and attendees...');

  let ticketCount = 0;
  let attendeeCount = 0;

  // Process events in batches for better performance
  const batchSize = 10;

  for (
    let eventIndex = 0;
    eventIndex < events.length;
    eventIndex += batchSize
  ) {
    const eventBatch = events.slice(eventIndex, eventIndex + batchSize);

    for (const event of eventBatch) {
      // Skip some events to create the edge case of events with no attendees
      if (Math.random() < 0.2) continue;

      // Determine how many attendees to create
      let attendeeTarget: number;

      if (event.maxAttendees && Math.random() < 0.1) {
        // Create an event at max capacity (edge case)
        attendeeTarget = event.maxAttendees;
      } else {
        // Create a random number of attendees
        const maxPossible = event.maxAttendees || users.length;
        attendeeTarget = getRandomInt(
          1,
          Math.min(maxPossible, users.length / 2),
        );
      }

      // Get random users as attendees
      const attendeeUsers = getRandomItems(users, 0, attendeeTarget);

      // Process attendees in smaller batches
      const attendeeBatchSize = 20;
      for (
        let userIndex = 0;
        userIndex < attendeeUsers.length;
        userIndex += attendeeBatchSize
      ) {
        const userBatch = attendeeUsers.slice(
          userIndex,
          userIndex + attendeeBatchSize,
        );

        await Promise.all(
          userBatch.map(async (user) => {
            const now = new Date();
            const isPublished = event.publishDate <= now;
            const hasNotEnded = event.endDate > now;

            // For seeding purposes, create tickets for most events regardless of dates
            // but still maintain some realistic filtering
            if (Math.random() < 0.8 || (isPublished && hasNotEnded)) {
              try {
                // Use a transaction for creating related records
                await prisma.$transaction(async (tx) => {
                  // Create attendee record
                  const attendee = await tx.eventAttendee.create({
                    data: {
                      user: {
                        connect: { id: user.id },
                      },
                      event: {
                        connect: { id: event.id },
                      },
                    },
                  });
                  attendeeCount++;

                  // Create ticket with different statuses
                  let status: TicketStatusType = TicketStatusType.VALID;

                  // Some tickets are used or cancelled
                  if (Math.random() < 0.2) {
                    status = TicketStatusType.USED;
                  } else if (Math.random() < 0.1) {
                    status = TicketStatusType.CANCELLED;
                  }

                  const ticket = await tx.ticket.create({
                    data: {
                      status,
                      user: {
                        connect: { id: user.id },
                      },
                      event: {
                        connect: { id: event.id },
                      },
                      attendee: {
                        connect: { id: attendee.id },
                      },
                    },
                  });

                  // Create payment record for paid events
                  if (event.price > 0) {
                    await tx.payment.create({
                      data: {
                        amount: event.price,
                        status: PaymentStatusType.COMPLETED,
                        paymentIntent: `pi_${faker.string.alphanumeric(24)}`,
                        user: {
                          connect: { id: user.id },
                        },
                        ticket: {
                          connect: { id: ticket.id },
                        },
                      },
                    });
                  }

                  ticketCount++;
                });
              } catch (error) {
                console.error(
                  `Error creating ticket: ${error instanceof Error ? error.message : String(error)}`,
                );
              }
            }
          }),
        );
      }
    }
  }

  console.log(`Created ${attendeeCount} attendees and ${ticketCount} tickets`);
}
