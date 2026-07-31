/*
  Warnings:

  - You are about to drop the `_ServiceToTechnicianProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ServiceToTechnicianProfile" DROP CONSTRAINT "_ServiceToTechnicianProfile_A_fkey";

-- DropForeignKey
ALTER TABLE "_ServiceToTechnicianProfile" DROP CONSTRAINT "_ServiceToTechnicianProfile_B_fkey";

-- DropTable
DROP TABLE "_ServiceToTechnicianProfile";

-- CreateTable
CREATE TABLE "TechnicianService" (
    "id" TEXT NOT NULL,
    "technicianId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priceOverride" DECIMAL(65,30),
    "estimatedDuration" INTEGER,

    CONSTRAINT "TechnicianService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechnicianService_technicianId_serviceId_key" ON "TechnicianService"("technicianId", "serviceId");

-- AddForeignKey
ALTER TABLE "TechnicianService" ADD CONSTRAINT "TechnicianService_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicianProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicianService" ADD CONSTRAINT "TechnicianService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
