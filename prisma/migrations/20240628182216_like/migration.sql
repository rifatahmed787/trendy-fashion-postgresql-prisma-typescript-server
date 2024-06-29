/*
  Warnings:

  - A unique constraint covering the columns `[post_id,likerId]` on the table `PostLike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PostLike_post_id_likerId_key" ON "PostLike"("post_id", "likerId");
