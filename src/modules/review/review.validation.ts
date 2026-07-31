import { z } from "zod";

export const createReviewSchema = z.object({
  content: z.string().optional(),
  rating: z.number().min(1).max(5),
});

export type CreateReviewPayload = z.infer<typeof createReviewSchema>;
