import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllUsersFromDB();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieved all users successfully.",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.updateUserStatusByUserId(
    req.params.userId as string,
    req.body,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: result.message,
    data: result.data,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllBookingsFromDB();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieved all bookings.",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllCategoriesFromDB();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieved all categories.",
    data: result,
  });
});

const createNewServiceCategory = catchAsync(
  async (req: Request, res: Response) => {},
);

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
  createNewServiceCategory,
};
