import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const createBooking = catchAsync(async (req: Request, res: Response) => {});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {});

export const bookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
};
