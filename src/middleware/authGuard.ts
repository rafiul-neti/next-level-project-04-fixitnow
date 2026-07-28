import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import httpStatus from "http-status";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";

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

      const { id, name, email, role } = verifiedToken.data as JwtPayload;
      if (role.length && !roles.includes(role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden Access!");
      }

      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "User not found. Please log in again.",
        );
      }

      req.user = { id, name, email, role };

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authGuard;
