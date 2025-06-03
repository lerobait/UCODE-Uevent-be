import type { Location, PrismaClient } from '@prisma/client';

import { MAJOR_CITIES } from '../data/locations';
import { generateRealisticLocation } from '../generators';
import type { LocationCreateData } from '../types';
import { logger } from '../utils/logger';

// Update the seedLocations function to create separate location arrays using createMany
export async function seedLocations(
  prisma: PrismaClient,
  count: number,
): Promise<Location[]> {
  logger.startOperation('Creating locations');

  if (count > MAJOR_CITIES.length) {
    logger.warning(
      `Need ${count} locations but only have ${MAJOR_CITIES.length} cities. Some cities will be reused with different offsets.`,
    );
  } else {
    logger.info(
      `Using ${count} locations from ${MAJOR_CITIES.length} available cities`,
    );
  }

  // Prepare location data
  const locationData: LocationCreateData[] = [];

  // Generate company location data
  logger.info(`Generating ${count} locations...`);
  for (let i = 0; i < count; i++) {
    // Use only realistic locations from MAJOR_CITIES
    locationData.push(generateRealisticLocation());

    // Show progress for large datasets
    if (i > 0 && i % 10 === 0) {
      logger.progress(i, count, 'locations');
    }
  }

  // Create locations in bulk using createMany
  logger.info('Saving locations to database...');
  const data = await prisma.$transaction(
    locationData.map((data) =>
      prisma.location.create({
        data,
      }),
    ),
  );

  logger.completeOperation('Creating locations', `${data.length} locations`);

  return data;
}
