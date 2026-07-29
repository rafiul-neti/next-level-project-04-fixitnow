import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { addressService } from "./address.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";

const getAddress = catchAsync(async (req: Request, res: Response) => {
  const result = await addressService.getAdressByUserId(req.user?.id as string);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Addresses retrieved successfully",
    data: result,
  });
});

const createOrUpdateAddress = catchAsync(
  async (req: Request, res: Response) => {},
);

export const addressController = { getAddress, createOrUpdateAddress };
