/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "paymentStatus";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentStatus";
