-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "totalPrice" DECIMAL(10,2),
ADD COLUMN     "workedMinutes" INTEGER;
