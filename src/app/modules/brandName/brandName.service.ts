import { PrismaClient, BrandName, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const createBrandName = async (
  Type_data: BrandName,
  user: JwtPayload
): Promise<BrandName | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can create Type')
  }

  const createType = await prisma.BrandName.create({
    data: Type_data,
  })
  return createType
}

const getBrandName = async (user: JwtPayload): Promise<BrandName[]> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can get the Type'
    )
  }

  const getData = await prisma.BrandName.findMany()
  return getData
}

const updateBrandName = async (
  id: string,
  Type_data: Partial<BrandName>,
  user: JwtPayload
): Promise<BrandName | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update Type'
    )
  }

  const existingTypeId = parseInt(id)
  const existingType = await prisma.BrandName.findUnique({
    where: {
      id: existingTypeId,
    },
  })

  if (!existingType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Type not found')
  }

  // Now, update the Type
  const updateTypeId = parseInt(id)
  const updated_Type_data = await prisma.BrandName.update({
    where: {
      id: updateTypeId,
    },
    data: Type_data,
  })

  return updated_Type_data
}

const deleteBrandName = async (
  id: string,
  user: JwtPayload
): Promise<BrandName | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to delete Type'
    )
  }

  const existingTypeId = parseInt(id)
  const existingType = await prisma.BrandName.findUnique({
    where: {
      id: existingTypeId,
    },
  })

  if (!existingType) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Type not found')
  }

  // Now, delete the Type
  const deleteTypeId = parseInt(id)

  const deleteType = await prisma.BrandName.delete({
    where: {
      id: deleteTypeId,
    },
  })

  return deleteType
}

export const BrandNameService = {
  createBrandName,
  getBrandName,
  updateBrandName,
  deleteBrandName,
}
