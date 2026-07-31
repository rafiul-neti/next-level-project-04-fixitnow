import { TechnicianProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import {
  TechnicianQuery,
  UpdateTechnicianProfile,
} from "./technician.validation";
import httpStatus from "http-status";

const getAllTechniciansFromDB = async (query: TechnicianQuery) => {
  const {
    searchTerm,
    minRating,
    experienceYears,
    minHourlyRate,
    maxHourlyRate,
    serviceAreas,
    weekendDays,
  } = query;

  const where: TechnicianProfileWhereInput = {};

  const andConditions: TechnicianProfileWhereInput[] = [];
  const searchConditions: TechnicianProfileWhereInput[] = [];

  if (searchTerm) {
    searchConditions.push({
      bio: { contains: searchTerm, mode: "insensitive" },
    });
    andConditions.push({ OR: searchConditions });
  }

  if (serviceAreas) {
    andConditions.push({ serviceAreas: { hasSome: serviceAreas } });
  }

  if (minHourlyRate || maxHourlyRate) {
    if (minHourlyRate) {
      andConditions.push({ hourlyRate: { gte: minHourlyRate } });
    }

    if (maxHourlyRate) {
      andConditions.push({ hourlyRate: { lte: maxHourlyRate } });
    }
  }

  if (experienceYears) {
    andConditions.push({ experienceYears: { gte: experienceYears } });
  }

  if (weekendDays) {
    andConditions.push({ availability: { weekendDays } });
  }

  if (minRating) {
    andConditions.push({ reviews: { some: { givenStars: minRating } } });
  }

  if (andConditions.length) {
    where.AND = andConditions;
  }

  const technicians = await prisma.technicianProfile.findMany({
    where,
    include: {
      availability: {
        select: { startTime: true, endTime: true, weekendDays: true },
      },
    },
  });

  return technicians;
};

const getSingleTechnicianByID = async (technicianId: string) => {
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: { id: technicianId },
    include: {
      reviews: { omit: { technicianId: true, id: true } },
      availabity: {
        select: { weekendDays: true, startTime: true, endTime: true },
      },
      _count: { select: { reviews: true } },
    },
  });

  return technician;
};

const updateTechnicianProfileByTechnicianId = async (
  userId: string,
  payload: UpdateTechnicianProfile,
) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: { userId },
  });

  if (!technician) {
    throw new AppError(httpStatus.NOT_FOUND, "Technician user not found!");
  }

  const updateTechnicianProfile = await prisma.technicianProfile.update({
    where: { id: technician.id, userId },
    data: { ...payload },
  });

  return updateTechnicianProfile;
};

const updateAvailabilitySlotsByTechnicianId = async (
  technicianId: string,
) => {};

const getTechnicianBookingsByTechnicianId = async (technicianId: string) => {};

const updateBookingStatusByBookingId = async (technicianId: string) => {};

export const technicianService = {
  getAllTechniciansFromDB,
  getSingleTechnicianByID,
  updateTechnicianProfileByTechnicianId,
  updateAvailabilitySlotsByTechnicianId,
  getTechnicianBookingsByTechnicianId,
  updateBookingStatusByBookingId,
};
