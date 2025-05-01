import type { PrismaClient } from '@prisma/client';

import { logger } from './logger';

// Clear database
export async function clearDatabase(prisma: PrismaClient): Promise<void> {
  logger.startOperation('Clearing existing data');

  try {
    const tablenamesResult = await prisma.$queryRaw<
      Array<{ tablename: string }>
    >`
      SELECT tablename FROM pg_tables WHERE schemaname='public'
    `;

    const tables = tablenamesResult
      .map(({ tablename }) => tablename)
      .filter((name) => name !== '_prisma_migrations')
      .map((name) => `"public"."${name}"`)
      .join(', ');

    if (tables.length === 0) {
      logger.info('No tables to clear');
      return;
    }

    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    logger.completeOperation(
      'Clearing existing data',
      `Cleared ${tablenamesResult.length - 1} tables`,
    );
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    logger.error('Error clearing the database', error);
    throw error;
  }
}
