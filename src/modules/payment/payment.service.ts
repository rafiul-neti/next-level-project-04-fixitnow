import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import stripe from "../../lib/stripe";
import { AppError } from "../../utils/AppError";
import httpStatus from "http-status";
import {
  handleCheckoutSessionCompleted,
  handleCheckoutSessionExpired,
  handlePaymentIntentFailed,
} from "./payment.utils";
import {
  PaymentProvider,
  PaymentStatus,
} from "../../../generated/prisma/enums";

const createCheckoutSession = async (customerId: string, bookingId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId, userId: customerId },
    include: {
      service: { select: { name: true } },
      user: { select: { email: true } },
    },
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
    customer_email: booking.user.email,
    metadata: { userId: customerId, bookingId: booking.id },
    payment_intent_data: { metadata: { bookingId: booking.id } },
    success_url: `${config.app_url}/${booking.id}/checkout?success=true`,
    cancel_url: `${config.app_url}/${booking.id}/checkout?success=false`,
  });

  const payment = await prisma.payment.upsert({
    where: { bookingId },
    create: {
      bookingId: booking.id,
      stripeCheckoutSessionId: session.id,
      amount: Number(booking.totalPrice),
      method: "card",
      provider: PaymentProvider.STRIPE,
      status: PaymentStatus.PENDING,
    },
    update: {
      stripeCheckoutSessionId: session.id,
    },
  });

  return { paymentURL: session.url, payment };
};

const confirmPaymentWebhook = async (payload: Buffer, signature: string) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      config.stripe_wehhook_secret,
    );
  } catch (error: any) {
    throw new AppError(
      400,
      `Webhook signature verification failed: ${error.message}`,
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      await handleCheckoutSessionCompleted(session);
      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;
      await handleCheckoutSessionExpired(session);
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      await handlePaymentIntentFailed(paymentIntent);
      break;
    }

    default:
      console.log(
        `[stripe webhook] Unhandled event type: ${event.type} (id: ${event.id})`,
      );
      break;
  }
};

const getUserPaymentsFromDB = async () => {};

const getPaymentDetailsByID = async () => {};

export const paymentService = {
  createCheckoutSession,
  confirmPaymentWebhook,
  getUserPaymentsFromDB,
  getPaymentDetailsByID,
};
