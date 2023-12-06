-- AlterTable
ALTER TABLE "CartProduct" ADD COLUMN     "paymentStatus" "Status" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentStatus" "Status" DEFAULT 'Pending';
