import { prisma } from "../lib/prisma";
import { AppError } from "./AppError";
import httpStatus from "http-status";

const validateUser = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Something went wrong! Please log in.",
    );
  }

  return user;
};

export default validateUser;
