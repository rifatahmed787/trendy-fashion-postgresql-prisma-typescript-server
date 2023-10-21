/*
  Warnings:

  - You are about to drop the column `gender` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `productWarranty` on the `Products` table. All the data in the column will be lost.
  - Added the required column `productGender` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "gender",
DROP COLUMN "productWarranty",
ADD COLUMN     "productGender" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "role" SET DEFAULT 'user';

-- CreateTable
CREATE TABLE "WishList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "WishList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WishList" ADD CONSTRAINT "WishList_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
