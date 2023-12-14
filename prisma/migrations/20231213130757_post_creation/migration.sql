/*
  Warnings:

  - You are about to drop the column `comments` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "comments",
DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "PostComment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "PostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" SERIAL NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
