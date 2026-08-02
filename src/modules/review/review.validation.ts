import { z } from "zod";

export const createReviewSchema = z.object({
  content: z.string().optional(),
  rating: z.number().min(1).max(5),
});

export const bookingIdSchema = z.object({
  bookingId: z.uuid(),
});

export type CreateReviewPayload = z.infer<typeof createReviewSchema>;
