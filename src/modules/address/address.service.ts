import { prisma } from "../../lib/prisma";
import { IAddress } from "./address.interface";

const getAdressByUserId = async (userId: string) => {
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return addresses;
};

const createOrUpdateAddress = async (payload: IAddress) => {};

export const addressService = {
  getAdressByUserId,
  createOrUpdateAddress,
};
