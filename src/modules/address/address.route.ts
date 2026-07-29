import { Router } from "express";
import { addressController } from "./address.controller";
import authGuard from "../../middleware/authGuard";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get(
  "/",
  authGuard(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  addressController.getAddress,
);
router.put(
  "/",
  authGuard(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  addressController.createOrUpdateAddress,
);

export const addressRoutes = router;
