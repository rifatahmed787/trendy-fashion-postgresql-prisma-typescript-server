/*
  Warnings:

  - Made the column `totalPrice` on table `CartProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartProduct" ALTER COLUMN "totalPrice" SET NOT NULL;
