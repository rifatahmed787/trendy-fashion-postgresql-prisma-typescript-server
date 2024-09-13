-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Others');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'Male';
