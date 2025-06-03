import type {
  AuthProviderType,
  EventFormatType,
  EventThemeType,
  Location,
  NotificationChannelType,
  ReactionType,
  UserRole,
} from '@prisma/client';

// Type definitions for better type safety
export type ImageGenerator = (index: number) => string | null;

export interface SeedConfig {
  users: number;
  companies: number;
  eventsPerCompany: { min: number; max: number };
  commentsPerEvent: { min: number; max: number };
  reactionsPerComment: { min: number; max: number };
  promoCodesPerCompany: { min: number; max: number };
  newsPerCompany: { min: number; max: number };
  subscriptionsPerUser: { min: number; max: number };
  ticketsPerUser: { min: number; max: number };
  notificationsPerUser: { min: number; max: number };
}

export interface ImageGenerators {
  avatar: ImageGenerator;
  eventPoster: ImageGenerator;
  companyLogo: ImageGenerator;
  companyCover: ImageGenerator;
  newsImage: ImageGenerator;
}

export interface UserCreateData {
  name: string;
  email: string;
  password: string | null;
  avatar: string | null;
  bio: string | null;
  role: UserRole;
  authProvider: AuthProviderType;
  emailVerified: boolean;
  settings: {
    create: {
      showInAttendeeList: boolean;
      showFollowingList: boolean;
      eventReminderChannel: NotificationChannelType;
      ticketPurchaseChannel: NotificationChannelType;
      newCommentChannel: NotificationChannelType;
      companyUpdateChannel: NotificationChannelType;
      themeMainColor: string | null;
    };
  };
}

export interface LocationCreateData {
  address: string;
  lat: number;
  lng: number;
}

export interface CompanyCreateData {
  name: string;
  email: string;
  description: string | null;
  website: string | null;
  logo: string | null;
  coverImage: string | null;
  isVerified: boolean;
  stripeAccountId: string | null;
  ownerId: string;
  locationId: string;
}

export interface EventCreateData {
  title: string;
  description: string;
  posterUrl: string | null;
  startDate: Date;
  endDate: Date;
  publishDate: Date;
  price: number;
  maxAttendees: number | null;
  showAttendeeList: boolean;
  notifyOnNewAttendee: boolean;
  format: EventFormatType;
  themes: EventThemeType[];
  stripeProductId: string | null;
  stripePriceId: string | null;
  companyId: string;
  creatorId: string;
  locationId: string | null;
}

export interface CommentCreateData {
  content: string;
  userId: string;
  eventId?: string;
  companyNewsId?: string;
  parentId?: string;
  createdAt: Date;
}

export interface ReactionCreateData {
  type: ReactionType;
  userId: string;
  commentId: string;
}

export interface NotificationCreateData {
  type: string;
  title: string;
  content: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  userId: string;
  sentById?: string;
}

// Major city coordinates for realistic locations
export interface CityLocation {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

// Update the LocationsResult interface to remove premiumLocations
export interface LocationsResult {
  companyLocations: Location[];
  eventLocations: Location[];
}
