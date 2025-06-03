import type { SeedConfig } from './types';

export const SEED_CONFIG: SeedConfig = {
  users: 250,
  companies: 150,
  eventsPerCompany: { min: 2, max: 15 },
  commentsPerEvent: { min: 0, max: 15 },
  reactionsPerComment: { min: 0, max: 8 },
  promoCodesPerCompany: { min: 0, max: 3 },
  newsPerCompany: { min: 0, max: 5 },
  subscriptionsPerUser: { min: 0, max: 10 },
  ticketsPerUser: { min: 0, max: 5 },
  notificationsPerUser: { min: 0, max: 15 },
};
