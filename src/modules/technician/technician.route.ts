import { Router } from "express";
import { technicianController } from "./technician.controller";
import validateQuery from "../../middleware/validateQuery";
import { getTechnicianQuerySchema } from "./technician.validation";

const router = Router();

router.get(
  "/",
  validateQuery(getTechnicianQuerySchema),
  technicianController.getAllTechnicians,
);
router.get("/:id", technicianController.getSingleTechnician);

export const technicianRoutes = router;
