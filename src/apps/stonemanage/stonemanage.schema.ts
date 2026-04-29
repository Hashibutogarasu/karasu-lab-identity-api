import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullable(),
  image: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;

export const GameSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  imageKey: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Game = z.infer<typeof GameSchema>;

export const StoneSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  userId: z.string(),
  name: z.string(),
  amount: z.number().int(),
  imageKey: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Stone = z.infer<typeof StoneSchema>;

export const StoneLogSchema = z.object({
  id: z.string(),
  stoneId: z.string(),
  userId: z.string(),
  amount: z.number().int(),
  previousAmount: z.number().int().optional(),
  nextAmount: z.number().int().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type StoneLog = z.infer<typeof StoneLogSchema>;
