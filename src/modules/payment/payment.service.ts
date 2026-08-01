const createCheckoutSession = async (userId: string, bookingId: string) => {};

const confirmPaymentWebhook = async () => {};

const getUserPaymentsFromDB = async () => {};

const getPaymentDetailsByID = async () => {};

export const paymentService = {
  createCheckoutSession,
  confirmPaymentWebhook,
  getUserPaymentsFromDB,
  getPaymentDetailsByID,
};
