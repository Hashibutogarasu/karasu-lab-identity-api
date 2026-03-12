import { describe, expect, it, vi, beforeEach, Mock } from 'vitest';
import { AuthorService } from './author.service.js';
import { IFirebaseAdminProvider } from '../shared/firebase/firebase-admin.provider.interface.js';

const mockFindMany = vi.fn();
const mockFindUnique = vi.fn();

vi.mock('../prisma.js', () => ({
  default: () => ({
    user: {
      findMany: mockFindMany,
      findUnique: mockFindUnique,
    },
  }),
  getPrisma: () => ({
    user: {
      findMany: mockFindMany,
      findUnique: mockFindUnique,
    },
  }),
}));

const mockFirebase = {
  db: {},
  onModuleInit: vi.fn(),
} as unknown as IFirebaseAdminProvider;

const makeUsers = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `u${i + 1}`,
    name: `User ${i + 1}`,
    image: i % 2 === 0 ? `https://example.com/u${i + 1}.png` : null,
  }));

describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AuthorService(mockFirebase);
  });

  describe('listAuthors', () => {
    it('returns all authors mapped to UserResponseDto', async () => {
      const dbUsers = makeUsers(3);
      mockFindMany.mockResolvedValue(dbUsers);

      const result = await service.listAuthors();

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ id: 'u1', name: 'User 1', image: 'https://example.com/u1.png' });
      expect(result[1]).toEqual({ id: 'u2', name: 'User 2', image: null });
    });

    it('returns empty array when no users exist', async () => {
      mockFindMany.mockResolvedValue([]);
      const result = await service.listAuthors();
      expect(result).toEqual([]);
    });
  });

  describe('listAuthorsPaged', () => {
    it('returns first page with hasMore=false when results fit within limit', async () => {
      const dbUsers = makeUsers(2);
      mockFindMany.mockResolvedValue(dbUsers);

      const result = await service.listAuthorsPaged({ limit: 5 });

      expect(result.data).toHaveLength(2);
      expect(result.hasMore).toBe(false);
      expect(result.nextCursor).toBeNull();
      expect(result.limit).toBe(5);
      expect(result.total).toBeNull();
    });

    it('sets hasMore=true and nextCursor when more results exist', async () => {
      const dbUsers = makeUsers(3);
      mockFindMany.mockResolvedValue(dbUsers);

      const result = await service.listAuthorsPaged({ limit: 2 });

      expect(result.data).toHaveLength(2);
      expect(result.hasMore).toBe(true);
      expect(result.nextCursor).toBe('u2');
    });

    it('uses default limit of 20 when no query is provided', async () => {
      mockFindMany.mockResolvedValue([]);
      const result = await service.listAuthorsPaged();
      expect(result.limit).toBe(20);
    });

    it('passes cursor to Prisma when provided', async () => {
      mockFindMany.mockResolvedValue([]);
      await service.listAuthorsPaged({ limit: 10, cursor: 'u5' });

      const call = (mockFindMany as Mock).mock.calls[0][0] as Record<string, unknown>;
      expect(call.skip).toBe(1);
      expect(call.cursor).toEqual({ id: 'u5' });
    });

    it('does not pass cursor when not provided', async () => {
      mockFindMany.mockResolvedValue([]);
      await service.listAuthorsPaged({ limit: 10 });

      const call = (mockFindMany as Mock).mock.calls[0][0] as Record<string, unknown>;
      expect(call.skip).toBeUndefined();
      expect(call.cursor).toBeUndefined();
    });

    it('maps image null correctly', async () => {
      mockFindMany.mockResolvedValue([{ id: 'u1', name: 'Alice', image: null }]);
      const result = await service.listAuthorsPaged({ limit: 5 });
      expect(result.data[0].image).toBeNull();
    });
  });

  describe('getById', () => {
    it('returns author when found', async () => {
      mockFindUnique.mockResolvedValue({ id: 'u1', name: 'Alice', image: 'https://example.com/u1.png' });
      const result = await service.getById('u1');
      expect(result).toEqual({ id: 'u1', name: 'Alice', image: 'https://example.com/u1.png' });
    });

    it('returns null when author is not found', async () => {
      mockFindUnique.mockResolvedValue(null);
      const result = await service.getById('unknown');
      expect(result).toBeNull();
    });

    it('normalises null image from DB', async () => {
      mockFindUnique.mockResolvedValue({ id: 'u1', name: 'Bob', image: null });
      const result = await service.getById('u1');
      expect(result?.image).toBeNull();
    });
  });
});
