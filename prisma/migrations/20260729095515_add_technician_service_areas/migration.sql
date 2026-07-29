-- AlterTable
ALTER TABLE "technicianProfiles" ADD COLUMN     "serviceAreas" TEXT[] DEFAULT ARRAY[]::TEXT[];
