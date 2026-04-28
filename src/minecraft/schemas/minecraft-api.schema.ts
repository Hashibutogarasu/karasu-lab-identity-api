import { z } from 'zod';

export const xblResponseSchema = z.object({
  Token: z.string(),
  DisplayClaims: z.object({
    xui: z.array(
      z.object({
        uhs: z.string(),
      }),
    ),
  }),
});

export type XblResponse = z.infer<typeof xblResponseSchema>;

export const xstsResponseSchema = z.object({
  Token: z.string(),
});

export type XstsResponse = z.infer<typeof xstsResponseSchema>;

export const minecraftAuthResponseSchema = z.object({
  access_token: z.string(),
});

export type MinecraftAuthResponse = z.infer<typeof minecraftAuthResponseSchema>;

export const minecraftProfileResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  skins: z.array(
    z.object({
      state: z.string(),
      url: z.string(),
    }),
  ),
});

export type MinecraftProfileResponse = z.infer<
  typeof minecraftProfileResponseSchema
>;
