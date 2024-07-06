/*
  Warnings:

  - You are about to drop the column `age` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productCategory` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productColor` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productImage` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productQuality` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productSize` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productSpecification` on the `Products` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PostLike_post_id_likerId_key";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "age",
DROP COLUMN "productCategory",
DROP COLUMN "productColor",
DROP COLUMN "productImage",
DROP COLUMN "productQuality",
DROP COLUMN "productSize",
DROP COLUMN "productSpecification",
ADD COLUMN     "ages" TEXT[],
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "productImages" TEXT[],
ADD COLUMN     "productQualities" TEXT[],
ADD COLUMN     "productSpecifications" TEXT[];

-- CreateTable
CREATE TABLE "slider" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "des" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "slider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "paymentDetails" TEXT NOT NULL,
    "shipmentDetails" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModalImg" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModalImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSize" (
    "id" SERIAL NOT NULL,
    "size" TEXT NOT NULL,

    CONSTRAINT "ProductSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductColor" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "ProductColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialLink" (
    "id" SERIAL NOT NULL,
    "facebook" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,

    CONSTRAINT "socialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "termsConditon" (
    "id" SERIAL NOT NULL,
    "title" TEXT[],

    CONSTRAINT "termsConditon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductSizes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductColors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductSizes_AB_unique" ON "_ProductSizes"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductSizes_B_index" ON "_ProductSizes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductColors_AB_unique" ON "_ProductColors"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductColors_B_index" ON "_ProductColors"("B");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductSizes" ADD CONSTRAINT "_ProductSizes_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductSize"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductSizes" ADD CONSTRAINT "_ProductSizes_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductColors" ADD CONSTRAINT "_ProductColors_A_fkey" FOREIGN KEY ("A") REFERENCES "ProductColor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductColors" ADD CONSTRAINT "_ProductColors_B_fkey" FOREIGN KEY ("B") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
