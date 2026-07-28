import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { IAddress, IRegisterUserPayload } from "./auth.interface";
import httpStatus from "http-status";
import config from "../../config";

const registerUserIntoDB = async (payload: IRegisterUserPayload) => {
  const { name, email, password, phone, address } = payload;
  const { address_line_1, address_line_2, city, region, postCode } =
    address as IAddress;

  const isUserExist = await prisma.user.findUnique({ where: { email } });

  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A user already exists with this email!",
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
      address: {
        create: { address_line_1, address_line_2, city, postCode, region },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: createdUser.id, email: createdUser.email },
  });

  return user
};

export const authService = {
  registerUserIntoDB,
};
