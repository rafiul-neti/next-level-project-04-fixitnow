import { Router } from "express";
import { paymentController } from "./payment.controller";
import authGuard from "../../middleware/authGuard";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create/:bookingId",
  authGuard(Role.CUSTOMER),
  paymentController.createSession,
);

router.get("/", authGuard(Role.CUSTOMER), paymentController.getUserPayments);

router.get(
  "/:paymentId",
  authGuard(Role.CUSTOMER),
  paymentController.getSinglePaymentDetails,
);

export const paymentRoutes = router;
