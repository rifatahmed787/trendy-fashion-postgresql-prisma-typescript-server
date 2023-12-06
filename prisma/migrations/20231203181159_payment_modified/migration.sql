/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the column `orderNumber` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "paymentStatus";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderNumber",
ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';
