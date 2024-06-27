/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productType` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_category_id_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "productType" TEXT NOT NULL;

-- DropTable
DROP TABLE "Categories";

-- CreateTable
CREATE TABLE "PostCategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PostCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "PostCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
