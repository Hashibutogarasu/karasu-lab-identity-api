/**
 * Filters out null or undefined values from an array and returns a typed array of non-null values.
 * @param arr Array with potential null/undefined values
 * @returns Array of non-null values
 */
export const safeArray = <T>(arr: Array<T | undefined | null>): T[] =>
  arr.filter((v): v is T => v != null);
