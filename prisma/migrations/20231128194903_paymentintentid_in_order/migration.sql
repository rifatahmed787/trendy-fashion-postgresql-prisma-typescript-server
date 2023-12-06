/*
  Warnings:

  - The `paymentStatus` column on the `CartProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentStatus` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "Status" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentIntentId" TEXT,
DROP COLUMN "paymentStatus",
ADD COLUMN     "paymentStatus" "Status" NOT NULL DEFAULT 'Pending';
