import config from "../../config";
import { prisma } from "../../lib/prisma";
import stripe from "../../lib/stripe";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";

const createCheckoutSession = async (customerId: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId, userId: customerId },
    include: { service: { select: { name: true } } },
  });

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found!");
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "bdt",
          unit_amount: Math.round(Number(booking.totalPrice) * 100),
          product_data: { name: booking.service.name },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"],
    metadata: { userId: customerId, bookingId: booking.id },
    success_url: `${config.app_url}/${booking.id}/checkout?success=true`,
    cancel_url: `${config.app_url}/${booking.id}/checkout?success=false`,
  });

  return { paymentURL: session.url };
};

const confirmPaymentWebhook = async () => {};

const getUserPaymentsFromDB = async () => {};

const getPaymentDetailsByID = async () => {};

export const paymentService = {
  createCheckoutSession,
  confirmPaymentWebhook,
  getUserPaymentsFromDB,
  getPaymentDetailsByID,
};
