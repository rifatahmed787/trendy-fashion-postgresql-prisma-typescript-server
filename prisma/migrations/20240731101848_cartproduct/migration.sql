-- CreateEnum
CREATE TYPE "Shipping" AS ENUM ('ONSTART', 'ONGOING', 'DONE', 'RETURN');

-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "deliveryTime" TEXT NOT NULL DEFAULT '2 days',
ADD COLUMN     "paymentType" TEXT NOT NULL DEFAULT 'Online',
ADD COLUMN     "shipping" "Shipping" NOT NULL DEFAULT 'ONSTART';
