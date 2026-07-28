import { NextFunction, Request, Response } from "express";
// import catchAsync from "../utils/catchAsync";


const authGuard = (...roles: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        
    }
};
