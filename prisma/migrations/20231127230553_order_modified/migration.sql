/*
  Warnings:

  - You are about to drop the column `quantity` on the `Products` table. All the data in the column will be lost.
  - Added the required column `paymentStatus` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "paymentIntentId" TEXT,
ADD COLUMN     "paymentStatus" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "paymentStatus" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "quantity",
ADD COLUMN     "stockQuantity" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "stripeCustomerId" TEXT;
