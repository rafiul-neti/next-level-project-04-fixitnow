import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUserIntoDB(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "User registered successfully.",
    data: result,
  });
});

export const authController = {
  registerUser,
};
