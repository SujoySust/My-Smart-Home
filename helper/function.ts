/**
 * Capitalizes the first letter of a string
 * @param str The input string to capitalize
 * @returns The string with first letter capitalized
 */
export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Capitalizes the first letter of each word in a string
 * @param str The input string to capitalize
 * @returns The string with first letter of each word capitalized
 */
export const capitalizeFirstLetterOfEachWord = (str: string): string => {
  if (!str) return str;
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getTodayDate = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
