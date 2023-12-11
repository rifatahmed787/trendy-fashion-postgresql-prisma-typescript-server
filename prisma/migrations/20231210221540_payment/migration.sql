/*
  Warnings:

  - You are about to drop the column `amountTotal` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `receipt_url` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amountTotal",
DROP COLUMN "orderId",
DROP COLUMN "paymentStatus",
ADD COLUMN     "receipt_url" TEXT NOT NULL;
