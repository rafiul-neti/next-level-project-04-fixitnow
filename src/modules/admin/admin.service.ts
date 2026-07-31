import { prisma } from "../../lib/prisma";
import findUserOrThrow from "../../utils/findUserOrThrow";
import { UserStatusInput } from "./admin.validation";

const getAllUsersFromDB = async () => {
  const users = await prisma.user.findMany({
    omit: { password: true },
    include: {
      technician: {
        select: {
          technicianServices: {
            select: {
              service: {
                select: {
                  name: true,
                  description: true,
                  category: { select: { name: true } },
                },
              },
            },
          },
          availability: true,
          experienceYears: true,
          hourlyRate: true,
          serviceAreas: true,
        },
      },
      addresses: { omit: { userId: true } },
      reviews: {
        select: {
          id: true,
          bookingId: true,
          technicianId: true,
          content: true,
          givenStars: true,
        },
      },
    },
  });

  return users;
};

const updateUserStatusByUserId = async (
  userId: string,
  payload: UserStatusInput,
) => {
  const user = await findUserOrThrow(userId);

  if (user.status === payload.status) {
    return {
      message: "No changes were necessary. Status is already up-to-date",
      data: user,
    };
  }

  const updateUser = await prisma.user.update({
    where: { id: userId },
    data: { ...payload },
    omit: { password: true },
  });

  return { message: "User's status updated successfully.", data: updateUser };
};

const getAllBookingsFromDB = async () => {
  const bookings = await prisma.booking.findMany();

  return bookings;
};

const getAllCategoriesFromDB = async () => {};

const createNewServiceCategoryIntoDB = async () => {};

export const adminService = {
  getAllUsersFromDB,
  updateUserStatusByUserId,
  getAllBookingsFromDB,
  getAllCategoriesFromDB,
  createNewServiceCategoryIntoDB,
};
