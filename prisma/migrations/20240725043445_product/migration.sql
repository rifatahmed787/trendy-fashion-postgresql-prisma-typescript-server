/*
  Warnings:

  - You are about to drop the column `quantity` on the `Products` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `ModalImg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percent` to the `ModalImg` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandName` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `newArrival` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productQuantity` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModalImg" ADD COLUMN     "categoryName" TEXT NOT NULL,
ADD COLUMN     "percent" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "quantity",
ADD COLUMN     "bestSelling" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "newArrival" BOOLEAN NOT NULL,
ADD COLUMN     "productQuantity" INTEGER NOT NULL,
ADD COLUMN     "productVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stockOut" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tags" TEXT[];
