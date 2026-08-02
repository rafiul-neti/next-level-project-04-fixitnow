import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { reviewService } from "./review.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import { bookingIdSchema } from "./review.validation";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = bookingIdSchema.parse(req.params);
  const result = await reviewService.createReviewIntoDB(
    req.user?.id as string,
    bookingId,
    req.body,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Review & rating submitted successfully.",
    data: result,
  });
});

export const reviewController = { createReview };
