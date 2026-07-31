import { Router } from "express";
import { technicianController } from "./technician.controller";
import validateQuery from "../../middleware/validateQuery";
import {
  getTechnicianQuerySchema,
  updateTechnicianProfileSchema,
} from "./technician.validation";
import authGuard from "../../middleware/authGuard";
import { Role } from "../../../generated/prisma/enums";
import validateRequest from "../../middleware/validateRequest";

const router = Router();

router.get(
  "/",
  validateQuery(getTechnicianQuerySchema),
  technicianController.getAllTechnicians,
);

router.get("/:id", technicianController.getSingleTechnician);

router.put(
  "/profile",
  authGuard(Role.TECHNICIAN),
  validateRequest(updateTechnicianProfileSchema),
  technicianController.updateTechnicianProfile,
);

router.put(
  "/availability",
  authGuard(Role.TECHNICIAN),
  technicianController.updateAvailabilitySlots,
);

router.get(
  "/bookings",
  authGuard(Role.TECHNICIAN),
  technicianController.getTechnicianBookings,
);

router.patch(
  "/bookings/:id",
  authGuard(Role.TECHNICIAN),
  technicianController.updateBookingStatus,
);

export const technicianRoutes = router;
