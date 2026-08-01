import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const createSession = catchAsync(async (req: Request, res: Response) => {});

const confirmPaymentSession = catchAsync(
  async (req: Request, res: Response) => {},
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
