import { CartProduct, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getOrderProductByUser = async (
  userId: number
): Promise<CartProduct[]> => {
  const getOrder = await prisma.cartProduct.findMany({
    where: {
      userId: userId,
      orderStatus: true,
    },
    include: {
      product: true,
      user: true,
    },
  })
  return getOrder
}

export const OrderService = {
  getOrderProductByUser,
}
