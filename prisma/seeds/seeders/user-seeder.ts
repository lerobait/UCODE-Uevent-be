import { faker } from '@faker-js/faker';
import {
  NotificationChannelType,
  type PrismaClient,
  type User,
} from '@prisma/client';
import bcrypt from 'bcryptjs';

import { SEED_CONFIG } from '../config';
import { imageGenerators } from '../generators';
import type { UserCreateData } from '../types';
import { getRandomEnum } from '../utils/helpers';
import { logger } from '../utils/logger';

// Seed users - all verified as requested
export async function seedUsers(prisma: PrismaClient): Promise<User[]> {
  logger.startOperation('Creating users');

  // Prepare user data in batches for better performance
  const userCreateData: UserCreateData[] = [];

  // Generate user data
  logger.info(`Generating data for ${SEED_CONFIG.users} users...`);
  for (let i = 0; i < SEED_CONFIG.users; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const authProvider = Math.random() > 0.8 ? 'GOOGLE' : 'EMAIL';

    // Only hash password for email auth users
    const password =
      authProvider === 'EMAIL' ? await bcrypt.hash('Password123!', 10) : null;

    const avatar = imageGenerators.avatar(i);
    const showInAttendeeList = Math.random() > 0.2;
    const showFollowingList = Math.random() > 0.2;

    userCreateData.push({
      name,
      email,
      password,
      avatar,
      bio: Math.random() > 0.3 ? faker.person.bio() : null,
      role: 'USER',
      authProvider,
      emailVerified: true, // All users are verified as requested
      settings: {
        create: {
          showInAttendeeList,
          showFollowingList,
          eventReminderChannel: getRandomEnum(NotificationChannelType),
          ticketPurchaseChannel: getRandomEnum(NotificationChannelType),
          newCommentChannel: getRandomEnum(NotificationChannelType),
          companyUpdateChannel: getRandomEnum(NotificationChannelType),
          themeMainColor: faker.color.rgb(),
        },
      },
    });

    // Show progress for large datasets
    if (SEED_CONFIG.users > 50 && i % 25 === 0) {
      logger.progress(i, SEED_CONFIG.users, 'Users');
    }
  }

  // Create users in batches for better performance
  const batchSize = 50;
  const users: User[] = [];
  logger.info(`Creating users in batches of ${batchSize}...`);

  for (let i = 0; i < userCreateData.length; i += batchSize) {
    const batch = userCreateData.slice(i, i + batchSize);
    logger.progress(i, userCreateData.length, 'Creating users');

    const createdUsers = await Promise.all(
      batch.map((userData) =>
        prisma.user.create({
          data: userData,
        }),
      ),
    );
    users.push(...createdUsers);
  }

  logger.completeOperation('Creating users', `${users.length} users created`);
  return users;
}
