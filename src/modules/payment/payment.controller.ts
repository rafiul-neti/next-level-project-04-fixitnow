import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";

const createSession = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.createCheckoutSession(
    req.user?.id as string,
    req.params.bookingId as string,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Thank you for your order!",
    data: result,
  });
});

const confirmPaymentSession = catchAsync(
  async (req: Request, res: Response) => {
    const event = req.body as Buffer;
    const signature = req.headers["stripe-signature"] as string;

    await paymentService.confirmPaymentWebhook(event, signature);

    res.status(200).json({ received: true });
  },
);

const getUserPayments = catchAsync(async (req: Request, res: Response) => {});

const getSinglePaymentDetails = catchAsync(
  async (req: Request, res: Response) => {},
);

export const paymentController = {
  createSession,
  confirmPaymentSession,
  getUserPayments,
  getSinglePaymentDetails,
};
