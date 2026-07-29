import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { servicesService } from "./services.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const { query } = req;
  const result = await servicesService.getAllServicesFromDB(query);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieved all services",
    data: result,
  });
});

export const servicesController = { getAllServices };
