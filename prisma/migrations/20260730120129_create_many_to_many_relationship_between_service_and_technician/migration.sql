-- CreateTable
CREATE TABLE "_ServiceToTechnicianProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ServiceToTechnicianProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ServiceToTechnicianProfile_B_index" ON "_ServiceToTechnicianProfile"("B");

-- AddForeignKey
ALTER TABLE "_ServiceToTechnicianProfile" ADD CONSTRAINT "_ServiceToTechnicianProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceToTechnicianProfile" ADD CONSTRAINT "_ServiceToTechnicianProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "technicianProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
