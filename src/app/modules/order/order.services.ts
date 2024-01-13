import { CartProduct, PrismaClient, Role } from '@prisma/client'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
const prisma = new PrismaClient()

const getAllOrder = async (user: JwtPayload): Promise<CartProduct[]> => {
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create products'
    )
  }
  const getOrder = await prisma.cartProduct.findMany({
    where: {
      orderStatus: true,
    },
    include: {
      product: true,
      user: true,
    },
  })
  return getOrder
}

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
  getAllOrder,
  getOrderProductByUser,
}
