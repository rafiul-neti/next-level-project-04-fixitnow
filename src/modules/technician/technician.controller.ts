import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";
import { getTechnicianQuerySchema } from "./technician.validation";

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
  const result = await technicianService.getAllTechniciansFromDB(req.query);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieved all technicians successfully.",
    data: result,
  });
});

const getSingleTechnician = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await technicianService.getSingleTechnicianByID(id as string);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Technician retrieved successfully",
    data: result,
  });
});

export const technicianController = { getAllTechnicians, getSingleTechnician };
