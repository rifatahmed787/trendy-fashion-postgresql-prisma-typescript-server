import { PrismaClient, ProductType, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const createProductType = async (
  Type_data: ProductType,
  user: JwtPayload
): Promise<ProductType | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can create Type')
  }

  const createType = await prisma.productType.create({
    data: Type_data,
  })
  return createType
}

const getType = async (user: JwtPayload): Promise<ProductType[]> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can get the Type'
    )
  }

  const getData = await prisma.productType.findMany()
  return getData
}

const updateType = async (
  id: string,
  Type_data: Partial<ProductType>,
  user: JwtPayload
): Promise<ProductType | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update Type'
    )
  }

  const existingTypeId = parseInt(id)
  const existingType = await prisma.productType.findUnique({
    where: {
      id: existingTypeId,
    },
  })

  if (!existingType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Type not found')
  }

  // Now, update the Type
  const updateTypeId = parseInt(id)
  const updated_Type_data = await prisma.productType.update({
    where: {
      id: updateTypeId,
    },
    data: Type_data,
  })

  return updated_Type_data
}

const deleteType = async (
  id: string,
  user: JwtPayload
): Promise<ProductType | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update Type'
    )
  }

  const existingTypeId = parseInt(id)
  const existingType = await prisma.productType.findUnique({
    where: {
      id: existingTypeId,
    },
  })

  if (!existingType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Type not found')
  }

  // Now, delete the Type
  const deleteTypeId = parseInt(id)

  const deleteType = await prisma.productType.delete({
    where: {
      id: deleteTypeId,
    },
  })

  return deleteType
}

export const ProductTypeService = {
  createProductType,
  getType,
  updateType,
  deleteType,
}
