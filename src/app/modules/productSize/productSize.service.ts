import { PrismaClient, ProductSize, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const createProductSize = async (
  Size_data: ProductSize,
  user: JwtPayload
): Promise<ProductSize | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can create Size')
  }

  const createSize = await prisma.productSize.create({
    data: Size_data,
  })
  return createSize
}

const getSize = async (user: JwtPayload): Promise<ProductSize[]> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can get the Size'
    )
  }

  const getData = await prisma.productSize.findMany()
  return getData
}

const updateSize = async (
  id: string,
  Size_data: Partial<ProductSize>,
  user: JwtPayload
): Promise<ProductSize | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update Size'
    )
  }

  const existingSizeId = parseInt(id)
  const existingSize = await prisma.productSize.findUnique({
    where: {
      id: existingSizeId,
    },
  })

  if (!existingSize) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found')
  }

  // Now, update the Size
  const updateSizeId = parseInt(id)
  const updated_Size_data = await prisma.productSize.update({
    where: {
      id: updateSizeId,
    },
    data: Size_data,
  })

  return updated_Size_data
}

const deleteSize = async (
  id: string,
  user: JwtPayload
): Promise<ProductSize | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update Size'
    )
  }

  const existingSizeId = parseInt(id)
  const existingSize = await prisma.productSize.findUnique({
    where: {
      id: existingSizeId,
    },
  })

  if (!existingSize) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Size not found')
  }

  // Now, delete the Size
  const deleteSizeId = parseInt(id)

  const deleteSize = await prisma.productSize.delete({
    where: {
      id: deleteSizeId,
    },
  })

  return deleteSize
}

export const ProductSizeService = {
  createProductSize,
  getSize,
  updateSize,
  deleteSize,
}
