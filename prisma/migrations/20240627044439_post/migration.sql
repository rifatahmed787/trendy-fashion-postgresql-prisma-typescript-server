/*
  Warnings:

  - Added the required column `commenterId` to the `PostComment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likerId` to the `PostLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostComment" ADD COLUMN     "commenterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PostLike" ADD COLUMN     "likerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "content" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "PostComment" ADD CONSTRAINT "PostComment_commenterId_fkey" FOREIGN KEY ("commenterId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_likerId_fkey" FOREIGN KEY ("likerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
