import { prisma } from "../../lib/prisma";

const getAllCategoriesFromDB = async () => {
  const [result, totalCategories] = await Promise.all([
    prisma.category.findMany({
      omit: { createdAt: true, updatedAt: true },
      include: {
        _count: true,
        services: { select: { id: true, name: true, description: true } },
      },
    }),

    prisma.category.count(),
  ]);

  return {
    meta: { totalCategories },
    data: result.map(({ _count, ...categories }) => ({
      ...categories,
      totalServicesUnderThisCategory: _count.services,
    })),
  };
};

export const categoryService = { getAllCategoriesFromDB };
