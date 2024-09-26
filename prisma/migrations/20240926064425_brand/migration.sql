/*
  Warnings:

  - You are about to drop the column `typeName` on the `ProductBrand` table. All the data in the column will be lost.
  - Added the required column `brandName` to the `ProductBrand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductBrand" DROP COLUMN "typeName",
ADD COLUMN     "brandName" TEXT NOT NULL;
