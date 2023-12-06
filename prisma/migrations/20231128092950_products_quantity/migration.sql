/*
  Warnings:

  - You are about to drop the column `stockQuantity` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "stockQuantity",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
