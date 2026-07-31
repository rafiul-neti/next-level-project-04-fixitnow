import { Router } from "express";
import authGuard from "../../middleware/authGuard";
import { Role } from "../../../generated/prisma/enums";
import { bookingController } from "./booking.controller";
import validateRequest from "../../middleware/validateRequest";
import { createBookingSchema } from "./booking.validation";

const router = Router();

router.post(
  "/",
  authGuard(Role.CUSTOMER),
  validateRequest(createBookingSchema),
  bookingController.createBooking,
);
router.get("/", authGuard(Role.CUSTOMER), bookingController.getAllBookings);
router.get(
  "/:id",
  authGuard(Role.CUSTOMER),
  bookingController.getSingleBooking,
);

export const bookingRoutes = router;
