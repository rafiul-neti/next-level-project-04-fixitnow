import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import {
  IAddress,
  ILoginPayload,
  IRegisterUserPayload,
} from "./auth.interface";
import httpStatus from "http-status";
import config from "../../config";

const registerUserIntoDB = async (payload: IRegisterUserPayload) => {
  const { name, email, password, phone } = payload;

  if (phone.length !== 11) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid phone number");
  }

  const isUserExist = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone }] },
  });

  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A user already exists with this phone number or email!",
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
    },
    omit: { password: true },
  });

  return createdUser;
};

const loginUserIntoApp = async (payload: ILoginPayload) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({ where: { email } });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid Password!");
  }
};

export const authService = {
  registerUserIntoDB,
  loginUserIntoApp,
};
