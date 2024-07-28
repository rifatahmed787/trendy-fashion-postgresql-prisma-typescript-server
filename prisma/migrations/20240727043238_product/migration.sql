/*
  Warnings:

  - You are about to drop the column `productType` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the `_ProductColors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductSizes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type_id` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductColors" DROP CONSTRAINT "_ProductColors_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductColors" DROP CONSTRAINT "_ProductColors_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSizes" DROP CONSTRAINT "_ProductSizes_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductSizes" DROP CONSTRAINT "_ProductSizes_B_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "productType",
ADD COLUMN     "productColors" TEXT[],
ADD COLUMN     "productSizes" TEXT[],
ADD COLUMN     "type_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ProductColors";

-- DropTable
DROP TABLE "_ProductSizes";

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTag" (
    "id" SERIAL NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
