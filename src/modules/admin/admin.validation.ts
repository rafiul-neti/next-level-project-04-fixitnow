import { z } from "zod";
import { UserStatus } from "../../../generated/prisma/enums";

export const userStatusSchema = z.object({
  status: z.nativeEnum(UserStatus),
});

export type UserStatusInput = z.infer<typeof userStatusSchema>;
