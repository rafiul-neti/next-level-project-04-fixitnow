import { z } from "zod";
import { WeekendDays } from "../../../generated/prisma/enums";

export const getTechnicianQuerySchema = z.object({
  minHourlyRate: z.coerce.number().min(0).optional(),
  maxHourlyRate: z.coerce.number().min(0).optional(),
  experienceYears: z.coerce.number().min(0).optional(),
  serviceAreas: z
    .string()
    .transform((v) => v.split(",").map((a) => a.trim()))
    .optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  weekendDays: z.nativeEnum(WeekendDays).optional(),
  searchTerm: z.string().optional(),
});

export const updateTechnicianProfileSchema = z.object({
  profilePhoto: z.string().optional(),
  bio: z.string().optional(),
  experienceYears: z.number().optional(),
  hourlyRate: z.number().optional(),
  serviceAreas: z
    .string()
    .transform((v) => v.split(",").map((a) => a.trim()))
    .optional(),
});

export type TechnicianQuery = z.infer<typeof getTechnicianQuerySchema>;
export type UpdateTechnicianProfile = z.infer<
  typeof updateTechnicianProfileSchema
>;
