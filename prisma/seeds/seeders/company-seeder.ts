import { faker } from '@faker-js/faker';
import type { Company, PrismaClient, User } from '@prisma/client';

import { SEED_CONFIG } from '../config';
import { imageGenerators } from '../generators';
import type { CompanyCreateData } from '../types';
import { getRandomItem } from '../utils/helpers';
import { logger } from '../utils/logger';
import { seedLocations } from './location-seeder';

// Update the seedCompanies function to use company locations
export async function seedCompanies(
  prisma: PrismaClient,
  users: User[],
): Promise<Company[]> {
  logger.startOperation('Creating companies');

  // Prepare company data
  const companyCreateData: CompanyCreateData[] = [];
  const usedLocationIds = new Set<string>();
  const companyLocations = await seedLocations(prisma, SEED_CONFIG.companies);
  // Generate company data
  const companyCount = Math.min(SEED_CONFIG.companies, companyLocations.length);
  logger.info(`Generating data for ${companyCount} companies...`);

  for (let i = 0; i < companyCount; i++) {
    // Select a random user to be the owner
    const owner = getRandomItem(users);

    // Generate company data
    const name = faker.company.name();
    const email = faker.internet
      .email({ firstName: name.split(' ')[0], lastName: 'Events' })
      .toLowerCase();
    const description =
      faker.company.catchPhrase() + '. ' + faker.company.buzzPhrase();
    const website = `https://www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

    // Randomly determine if company is verified
    const isVerified = Math.random() > 0.3;

    // Create a stripe account ID for some companies
    const stripeAccountId = isVerified
      ? `acct_${faker.string.alphanumeric(16)}`
      : null;

    // Generate logo and cover image
    const logo = imageGenerators.companyLogo(i);
    const coverImage = imageGenerators.companyCover(i);

    // Select a location that hasn't been used yet
    const availableLocations = companyLocations.filter(
      (loc) => !usedLocationIds.has(loc.id),
    );

    if (availableLocations.length === 0) {
      logger.warning(
        'No more available company locations. Stopping company creation.',
      );
      break;
    }

    const location = getRandomItem(availableLocations);
    const locationId = location.id;
    usedLocationIds.add(location.id);

    companyCreateData.push({
      name,
      email,
      description,
      website,
      logo,
      coverImage,
      isVerified,
      stripeAccountId,
      ownerId: owner.id,
      locationId,
    });

    // Show progress for large datasets
    if (companyCount > 25 && i % 10 === 0) {
      logger.progress(i, companyCount, 'Companies');
    }
  }

  // Create companies in batches for better performance
  const batchSize = 25;
  const companies: Company[] = [];
  logger.info(`Creating companies in batches of ${batchSize}...`);

  for (let i = 0; i < companyCreateData.length; i += batchSize) {
    const batch = companyCreateData.slice(i, i + batchSize);
    logger.progress(i, companyCreateData.length, 'Creating companies');

    const createdCompanies = await Promise.all(
      batch.map((companyData) =>
        prisma.company.create({
          data: companyData,
        }),
      ),
    );
    companies.push(...createdCompanies);
  }

  logger.completeOperation(
    'Creating companies',
    `${companies.length} companies created`,
  );
  return companies;
}
