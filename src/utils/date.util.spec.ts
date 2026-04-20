import { describe, it, expect } from 'vite-plus/test';
import { toDateString, toDate } from './date.util.js';

describe('Date utilities', () => {
  describe('toDateString', () => {
    it('should convert Firestore Timestamp to ISO string', () => {
      const timestamp = {
        toDate: () => new Date('2026-03-08T10:30:00Z'),
      };
      const result = toDateString(timestamp);
      expect(result).toContain('2026-03-08');
    });

    it('should convert Date object to ISO string', () => {
      const date = new Date('2026-03-08T10:30:00Z');
      const result = toDateString(date);
      expect(result).toContain('2026-03-08');
    });

    it('should handle string dates', () => {
      const dateString = '2026-03-08T10:30:00.000Z';
      const result = toDateString(dateString);
      expect(result).toBe(dateString);
    });

    it('should return empty string for null', () => {
      expect(toDateString(null)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(toDateString(undefined)).toBe('');
    });
  });

  describe('toDate', () => {
    it('should convert Firestore Timestamp to Date', () => {
      const timestamp = {
        toDate: () => new Date('2026-03-08T10:30:00Z'),
      };
      const result = toDate(timestamp);
      expect(result instanceof Date).toBe(true);
    });

    it('should return Date object as-is', () => {
      const date = new Date('2026-03-08T10:30:00Z');
      const result = toDate(date);
      expect(result).toEqual(date);
    });

    it('should return new Date for null', () => {
      const result = toDate(null);
      expect(result instanceof Date).toBe(true);
    });

    it('should return new Date for undefined', () => {
      const result = toDate(undefined);
      expect(result instanceof Date).toBe(true);
    });
  });
});
