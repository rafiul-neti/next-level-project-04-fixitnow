import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";
import { paymentIdSchema } from "./payment.validation";

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

const getUserPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getUserPaymentsFromDB(
    req.user?.id as string,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Payments retrieved successfully.",
    data: result,
  });
});

const getSinglePaymentDetails = catchAsync(
  async (req: Request, res: Response) => {
    const { paymentId } = paymentIdSchema.parse(req.params);

    const result = await paymentService.getPaymentDetailsByID(paymentId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Payment details retrieved.",
      data: result,
    });
  },
);

export const paymentController = {
  createSession,
  confirmPaymentSession,
  getUserPayments,
  getSinglePaymentDetails,
};
