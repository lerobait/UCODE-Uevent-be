// Helper functions
export const getRandomItem = <T>(array: T[]): T => {
  if (array.length === 0) {
    throw new Error('Cannot get random item from empty array');
  }
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomItems = <T>(
  array: T[],
  min: number,
  max: number,
): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomEnum = <T>(enumObject: T): T[keyof T] => {
  const values = Object.values(enumObject) as T[keyof T][];
  return values[Math.floor(Math.random() * values.length)];
};

export const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

// Date range as requested: between a year ago and 2 years ahead
export const getRandomEventDate = (): Date => {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const twoYearsAhead = new Date(now);
  twoYearsAhead.setFullYear(now.getFullYear() + 2);

  return getRandomDate(oneYearAgo, twoYearsAhead);
};
