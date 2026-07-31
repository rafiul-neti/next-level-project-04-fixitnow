import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import httpStatus from "http-status";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";
import findUserOrThrow from "../utils/findUserOrThrow";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: Role;
      };
    }
  }
}

const authGuard = (...roles: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken
        ? req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer ")
          ? req.headers.authorization?.split(" ")[1]
          : req.headers.authorization;

      if (!token) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden Access!");
      }

      const verifiedToken = jwtUtils.verifyToken(
        token,
        config.jwt_access_secret,
      );

      if (!verifiedToken.success) {
        throw new AppError(httpStatus.UNAUTHORIZED, verifiedToken.error);
      }

      const { id: userId, role: userRole } = verifiedToken.data as JwtPayload;
      if (roles.length && !roles.includes(userRole)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden Access!");
      }

      const { id, name, email, role } = await findUserOrThrow(userId);

      req.user = { id, name, email, role };

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authGuard;
