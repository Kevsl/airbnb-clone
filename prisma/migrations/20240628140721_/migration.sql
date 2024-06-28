/*
  Warnings:

  - Added the required column `categoryId` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "categoryId" TEXT NOT NULL;
