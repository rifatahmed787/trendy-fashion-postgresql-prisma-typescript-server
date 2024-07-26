import { PrismaClient, ProductColor, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const createProductcolor = async (
  color_data: ProductColor,
  user: JwtPayload
): Promise<ProductColor | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create color'
    )
  }

  const createcolor = await prisma.productColor.create({
    data: color_data,
  })
  return createcolor
}

const getcolor = async (): Promise<ProductColor[]> => {
  const getData = await prisma.productColor.findMany()
  return getData
}

const updatecolor = async (
  id: string,
  color_data: Partial<ProductColor>,
  user: JwtPayload
): Promise<ProductColor | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update color'
    )
  }

  const existingcolorId = parseInt(id)
  const existingcolor = await prisma.productColor.findUnique({
    where: {
      id: existingcolorId,
    },
  })

  if (!existingcolor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'color not found')
  }

  // Now, update the color
  const updatecolorId = parseInt(id)
  const updated_color_data = await prisma.productColor.update({
    where: {
      id: updatecolorId,
    },
    data: color_data,
  })

  return updated_color_data
}

const deletecolor = async (
  id: string,
  user: JwtPayload
): Promise<ProductColor | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update color'
    )
  }

  const existingcolorId = parseInt(id)
  const existingcolor = await prisma.productColor.findUnique({
    where: {
      id: existingcolorId,
    },
  })

  if (!existingcolor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'color not found')
  }

  // Now, delete the color
  const deletecolorId = parseInt(id)

  const deletecolor = await prisma.productColor.delete({
    where: {
      id: deletecolorId,
    },
  })

  return deletecolor
}

export const ProductcolorService = {
  createProductcolor,
  getcolor,
  updatecolor,
  deletecolor,
}
