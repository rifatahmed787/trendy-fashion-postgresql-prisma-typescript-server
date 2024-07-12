/*
  Warnings:

  - You are about to drop the column `relatedProducts` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "relatedProducts";

-- CreateTable
CREATE TABLE "sliderHero" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "lgImg" TEXT NOT NULL,
    "smImg" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sliderHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "latestSectionHero" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "imgOne" TEXT NOT NULL,
    "imgTwo" TEXT NOT NULL,

    CONSTRAINT "latestSectionHero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSection" (
    "id" SERIAL NOT NULL,
    "subTitle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dealSection" (
    "id" SERIAL NOT NULL,
    "campaign" TEXT NOT NULL,
    "shipping" TEXT NOT NULL,
    "smImgOne" TEXT NOT NULL,
    "smImgTwo" TEXT NOT NULL,
    "lgImg" TEXT NOT NULL,

    CONSTRAINT "dealSection_pkey" PRIMARY KEY ("id")
);
