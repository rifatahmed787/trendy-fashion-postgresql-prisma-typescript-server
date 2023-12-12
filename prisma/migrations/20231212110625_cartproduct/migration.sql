/*
  Warnings:

  - Made the column `receipt_url` on table `CartProduct` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CartProduct" ALTER COLUMN "receipt_url" SET NOT NULL,
ALTER COLUMN "receipt_url" SET DEFAULT '';
