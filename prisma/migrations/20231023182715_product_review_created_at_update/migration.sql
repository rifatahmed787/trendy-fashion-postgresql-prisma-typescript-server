/*
  Warnings:

  - You are about to drop the column `reviewDate` on the `ProductReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductReview" DROP COLUMN "reviewDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
