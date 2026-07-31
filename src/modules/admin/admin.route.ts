import { Router } from "express";
import authGuard from "../../middleware/authGuard";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/users", authGuard(Role.ADMIN), adminController.getAllUsers);

router.patch(
  "/users/:userId",
  authGuard(Role.ADMIN),
  adminController.updateUserStatus,
);

router.get("/bookings", authGuard(Role.ADMIN), adminController.getAllBookings);

router.get(
  "/categories",
  authGuard(Role.ADMIN),
  adminController.getAllCategories,
);

router.post(
  "/categories",
  authGuard(Role.ADMIN),
  adminController.createNewServiceCategory,
);

export const adminRoutes = router;
