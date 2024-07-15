/*
  Warnings:

  - You are about to drop the column `paymentDetails` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `shipmentDetails` on the `service` table. All the data in the column will be lost.
  - Added the required column `img` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "paymentDetails",
DROP COLUMN "shipmentDetails",
ADD COLUMN     "img" TEXT NOT NULL;
