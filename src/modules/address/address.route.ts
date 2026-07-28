import { Router } from "express";
import { addressController } from "./address.controller";

const router = Router();

router.get("/", addressController.getAddress);
router.put("/", addressController.createOrUpdateAddress)

export const addressRoutes = router;
