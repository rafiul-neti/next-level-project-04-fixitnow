import { z } from "zod";

export const paymentIdSchema = z.object({
  paymentId: z.uuid(),
});
