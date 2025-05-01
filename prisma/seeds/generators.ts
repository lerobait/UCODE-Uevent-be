import { MAJOR_CITIES } from './data/locations';
import type { ImageGenerators, LocationCreateData } from './types';
import { getRandomItem } from './utils/helpers';

// Add functions to handle missing and invalid images
export const shouldHaveImage = (missingProbability = 0.1): boolean => {
  return Math.random() > missingProbability;
};

export const shouldHaveValidImage = (invalidProbability = 0.05): boolean => {
  return Math.random() > invalidProbability;
};

// Update image generators to include missing and invalid cases
export const imageGenerators: ImageGenerators = {
  // Generate unique avatar URLs
  avatar: (index: number): string | null => {
    if (!shouldHaveImage(0.05)) return null; // 5% of users have no avatar
    if (!shouldHaveValidImage())
      return 'https://invalid-image-url.com/broken.jpg'; // 5% have invalid URLs
    return `https://picsum.photos/seed/avatar${index}/200/200`;
  },

  // Generate unique event poster URLs
  eventPoster: (index: number): string | null => {
    if (!shouldHaveImage()) return null; // 10% of events have no poster
    if (!shouldHaveValidImage())
      return 'https://invalid-image-url.com/broken.jpg'; // 5% have invalid URLs
    return `https://picsum.photos/seed/event${index}/800/600`;
  },

  // Generate unique company logo URLs
  companyLogo: (index: number): string | null => {
    if (!shouldHaveImage()) return null; // 10% of companies have no logo
    if (!shouldHaveValidImage())
      return 'https://invalid-image-url.com/broken.jpg'; // 5% have invalid URLs
    return `https://picsum.photos/seed/logo${index}/400/400`;
  },

  // Generate unique company cover URLs
  companyCover: (index: number): string | null => {
    if (!shouldHaveImage()) return null; // 10% of companies have no cover
    if (!shouldHaveValidImage())
      return 'https://invalid-image-url.com/broken.jpg'; // 5% have invalid URLs
    return `https://picsum.photos/seed/cover${index}/1200/400`;
  },

  // Generate unique news image URLs
  newsImage: (index: number): string | null => {
    if (!shouldHaveImage()) return null; // 10% of news have no image
    if (!shouldHaveValidImage())
      return 'https://invalid-image-url.com/broken.jpg'; // 5% have invalid URLs
    return `https://picsum.photos/seed/news${index}/800/450`;
  },
};

// Generate a realistic location based on major cities
export const generateRealisticLocation = (): LocationCreateData => {
  // Ensure we don't go out of bounds with the MAJOR_CITIES array
  const city = getRandomItem(MAJOR_CITIES);

  // Add a small random offset to avoid exact same coordinates
  // but keep it close to the city center (within ~1-2km)
  const latOffset = (Math.random() - 0.5) * 0.02;
  const lngOffset = (Math.random() - 0.5) * 0.02;

  return {
    address: `${Math.floor(Math.random() * 1000) + 1} ${city.name} St, ${city.name}, ${city.country}`,
    lat: city.lat + latOffset,
    lng: city.lng + lngOffset,
  };
};
