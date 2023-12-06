/*
  Warnings:

  - Made the column `oldPrice` on table `Products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "oldPrice" SET NOT NULL,
ALTER COLUMN "oldPrice" SET DEFAULT 0.0;
