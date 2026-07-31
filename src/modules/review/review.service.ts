import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateReviewPayload } from "./review.validation";
import httpStatus from "http-status";

const createReviewIntoDB = async (
  userId: string,
  bookingId: string,
  payload: CreateReviewPayload,
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
      userId,
    },
  });

  if (!booking) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You can't review a service you didn't book!",
    );
  }

  if (booking.status !== BookingStatus.COMPLETED) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You can only review a completed booking!",
    );
  }

  const review = await prisma.review.create({
    data: {
      content: payload.content ?? "",
      givenStars: payload.rating,
      bookingId: booking.id,
      userId: booking.userId,
      technicianId: booking.technicianId,
    },
    omit: { userId: true, technicianId: true },
  });

  return review;
};

export const reviewService = { createReviewIntoDB };
