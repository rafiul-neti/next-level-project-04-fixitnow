import { z } from "zod";
import { UserStatus } from "../../../generated/prisma/enums";

export const userStatusSchema = z.object({
  status: z.nativeEnum(UserStatus),
});

export const createCategorySchema = z.object({
  name: z.string(),
});

export const userIdSchema = z.object({
  userId: z.uuid(),
});

export type UserStatusInput = z.infer<typeof userStatusSchema>;
export type CreateCategory = z.infer<typeof createCategorySchema>;
