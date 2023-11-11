-- CreateTable
CREATE TABLE "ProductAccordian" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "ProductAccordian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentAccordian" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "PaymentAccordian_pkey" PRIMARY KEY ("id")
);
