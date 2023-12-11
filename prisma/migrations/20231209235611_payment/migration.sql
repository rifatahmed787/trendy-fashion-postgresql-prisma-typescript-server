/*
  Warnings:

  - You are about to drop the column `amount_subtotal` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount_subtotal",
DROP COLUMN "paymentId",
DROP COLUMN "payment_status",
DROP COLUMN "sessionId",
DROP COLUMN "status";
