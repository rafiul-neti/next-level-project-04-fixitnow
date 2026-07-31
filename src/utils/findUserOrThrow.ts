import { prisma } from "../lib/prisma";
import { AppError } from "./AppError";
import httpStatus from "http-status";

const findUserOrThrow = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Something went wrong! Please log in.",
    );
  }

  return user;
};

export default findUserOrThrow;
