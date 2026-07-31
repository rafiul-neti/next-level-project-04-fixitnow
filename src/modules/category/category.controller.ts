import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { categoryService } from "./category.service";
import { sendSuccessResponse } from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategoriesFromDB();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Retrieved all categories along with their services successfully",
    data: result,
  });
});

export const categoryController = { getAllCategories };
