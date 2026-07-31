import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.createBookingIntoDB(
    req.user?.id as string,
    req.body,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Service booked successfully.",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {});

export const bookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
};
