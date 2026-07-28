import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { ILoginPayload, IRegisterUserPayload } from "./auth.interface";
import httpStatus from "http-status";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

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

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_referesh_secret,
    config.jwt_refresh_expires_in,
  );

  return { accessToken, refreshToken };
};

export const authService = {
  registerUserIntoDB,
  loginUserIntoApp,
};
