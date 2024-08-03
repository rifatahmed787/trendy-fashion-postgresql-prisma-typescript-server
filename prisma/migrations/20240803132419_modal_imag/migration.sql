/*
  Warnings:

  - You are about to drop the column `categoryName` on the `ModalImg` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `ModalImg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModalImg" DROP COLUMN "categoryName",
ADD COLUMN     "category_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ModalImg" ADD CONSTRAINT "ModalImg_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
