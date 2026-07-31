import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

const validateQuery = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query) as any;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateQuery;
