import { Router } from "express";
import { technicianController } from "./technician.controller";
import { getTechnicianQuerySchema } from "./technician.validation";

const router = Router();

router.get("/", technicianController.getAllTechnicians);

export const technicianRoutes = router;
