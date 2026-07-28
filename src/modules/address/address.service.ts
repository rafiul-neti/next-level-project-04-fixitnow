import { prisma } from "../../lib/prisma";

const getAdressFromDB = async (userId: string) => {
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};


export const addressService = {
    getAdressFromDB
}
