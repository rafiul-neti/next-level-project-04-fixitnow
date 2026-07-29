import { ServiceWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const getAllServicesFromDB = async (query: { searchTerm?: string }) => {
  const where: ServiceWhereInput = {};

  if (query.searchTerm) {
    where.OR = [
      { name: { contains: query.searchTerm, mode: "insensitive" } },
      { description: { contains: query.searchTerm, mode: "insensitive" } },
    ];
  }

  const services = await prisma.service.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
    },
  });

  return services;
};

export const servicesService = { getAllServicesFromDB };
