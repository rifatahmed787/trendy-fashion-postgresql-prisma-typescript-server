/*
  Warnings:

  - The `productColor` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `age` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "productColor",
ADD COLUMN     "productColor" TEXT[],
DROP COLUMN "age",
ADD COLUMN     "age" TEXT[];
