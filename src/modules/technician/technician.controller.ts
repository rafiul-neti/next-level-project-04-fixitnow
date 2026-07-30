import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";
import { getTechnicianQuerySchema } from "./technician.validation";

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
  const query = getTechnicianQuerySchema.parse(req.query);

  console.log("quey from technician controller", query);

  const result = await technicianService.getAllTechniciansFromDB(query);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieved all technicians successfully.",
    data: result,
  });
});

export const technicianController = { getAllTechnicians };
