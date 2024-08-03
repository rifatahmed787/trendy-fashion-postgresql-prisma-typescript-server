/*
  Warnings:

  - You are about to drop the column `category` on the `ProductAccordian` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `ProductAccordian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductAccordian" DROP COLUMN "category",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "accordianCategory" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "accordianCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductAccordian" ADD CONSTRAINT "ProductAccordian_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "accordianCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
