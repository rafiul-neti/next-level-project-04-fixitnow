import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { reviewService } from "./review.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.createReviewIntoDB(
    req.user?.id as string,
    req.params.bookingId as string,
    req.body,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Review & rating submitted successfully.",
    data: result,
  });
});

export const reviewController = { createReview };
