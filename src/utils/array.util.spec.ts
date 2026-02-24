import { describe, it, expect } from 'vitest';
import { safeArray } from './array.util.js';

describe('safeArray utility', () => {
  it('should filter out null and undefined values', () => {
    const input = [1, null, 2, undefined, 3];
    const result = safeArray(input);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should return an empty array for an array of only null/undefined', () => {
    const input = [null, undefined];
    const result = safeArray(input);
    expect(result).toEqual([]);
  });

  it('should retain falsy values like 0 or empty string', () => {
    const input = [0, '', false, null, undefined];
    const result = safeArray(input);
    expect(result).toEqual([0, '', false]);
  });
});
