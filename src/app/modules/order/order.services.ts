import { CartProduct, PrismaClient, Role } from '@prisma/client'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import { pagination_map } from '../../../helpers/pagination'
import { IPagination } from '../../../interfaces/pagination'
const prisma = new PrismaClient()

const getAllOrder = async (
  pagination_data: Partial<IPagination>,
  user: JwtPayload
): Promise<{
  meta: { page: number; limit: number; total: number }
  data: CartProduct[]
}> => {
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create products'
    )
  }
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  const total = await prisma.cartProduct.count()
  const getOrder = await prisma.cartProduct.findMany({
    where: {
      orderStatus: true,
    },
    orderBy: sortObject,
    skip: skip,
    take: limit,
    include: {
      product: true,
      user: true,
    },
  })
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: getOrder,
  }
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
