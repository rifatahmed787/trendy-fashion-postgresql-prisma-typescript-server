/*
  Warnings:

  - You are about to drop the column `brandName` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "brandName",
ADD COLUMN     "brand_id" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "ProductBrand" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,

    CONSTRAINT "ProductBrand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "ProductBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
