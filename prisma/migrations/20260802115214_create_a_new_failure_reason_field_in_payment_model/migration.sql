-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "failureReason" TEXT,
ALTER COLUMN "paidAt" DROP NOT NULL;
