/*
  Warnings:

  - Made the column `avatar` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT 'https://res.cloudinary.com/dztlowlu0/image/upload/v1700031261/avatar_ylo9mt.png';
