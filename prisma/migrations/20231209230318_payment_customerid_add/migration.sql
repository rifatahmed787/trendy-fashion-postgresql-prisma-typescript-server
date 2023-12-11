/*
  Warnings:

  - Added the required column `customerId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "customerId" TEXT NOT NULL;
