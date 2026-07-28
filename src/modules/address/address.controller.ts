import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";

const getAddress = catchAsync(async (req: Request, res: Response) => {});

const createOrUpdateAddress = catchAsync(
  async (req: Request, res: Response) => {},
);

export const addressController = { getAddress, createOrUpdateAddress };
