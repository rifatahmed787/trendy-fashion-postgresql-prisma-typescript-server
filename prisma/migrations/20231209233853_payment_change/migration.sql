/*
  Warnings:

  - You are about to drop the column `customerId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `amount_subtotal` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "customerId",
ADD COLUMN     "amount_subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "payment_status" TEXT NOT NULL DEFAULT 'Paid',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'complete';
