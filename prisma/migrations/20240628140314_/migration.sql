/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `rentalId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_categoryId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "categoryId",
ADD COLUMN     "rentalId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CategoryToRental" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToRental_AB_unique" ON "_CategoryToRental"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToRental_B_index" ON "_CategoryToRental"("B");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_rentalId_fkey" FOREIGN KEY ("rentalId") REFERENCES "Rental"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRental" ADD CONSTRAINT "_CategoryToRental_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRental" ADD CONSTRAINT "_CategoryToRental_B_fkey" FOREIGN KEY ("B") REFERENCES "Rental"("id") ON DELETE CASCADE ON UPDATE CASCADE;
