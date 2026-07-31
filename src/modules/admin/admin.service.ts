import { prisma } from "../../lib/prisma";

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

const updateUserStatusByUserId = async (userId: string) => {};

const getAllBookingsFromDB = async () => {};

const getAllCategoriesFromDB = async () => {};

const createNewServiceCategoryIntoDB = async () => {};

export const adminService = {
  getAllUsersFromDB,
  updateUserStatusByUserId,
  getAllBookingsFromDB,
  getAllCategoriesFromDB,
  createNewServiceCategoryIntoDB,
};
