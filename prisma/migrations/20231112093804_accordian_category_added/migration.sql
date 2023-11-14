/*
  Warnings:

  - You are about to drop the `PaymentAccordian` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `ProductAccordian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductAccordian" ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "PaymentAccordian";
