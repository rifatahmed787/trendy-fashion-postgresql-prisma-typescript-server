-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "buyerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
