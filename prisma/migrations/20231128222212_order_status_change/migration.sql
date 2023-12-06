-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentStatus" DROP NOT NULL,
ALTER COLUMN "paymentStatus" SET DEFAULT 'Pending';
