import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { PrismaClient, ProductAccordian, Role } from '@prisma/client'

const prisma = new PrismaClient({ errorFormat: 'minimal' })
// create accordian for products
const createProductAccordian = async (
  accordian_data: ProductAccordian,
  user_data: JwtPayload
): Promise<ProductAccordian | null> => {
  if (user_data?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin can add the accordian.'
    )
  }
  const created_product_accordian = await prisma.productAccordian.create({
    data: accordian_data,
  })

  return created_product_accordian
}

// get products accordian

const allproductAccordian = async (): Promise<ProductAccordian[]> => {
  const productAccordian = await prisma.productAccordian.findMany({
    include: {
      category: true,
    },
  })
  return productAccordian
}

const updateAccordian = async (
  id: string,
  user: JwtPayload,
  accordian_data: Partial<ProductAccordian>
): Promise<ProductAccordian | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update accordian'
    )
  }

  const existingAccordianId = parseInt(id)
  const existingAccordian = await prisma.productAccordian.findUnique({
    where: {
      id: existingAccordianId,
    },
  })

  if (!existingAccordian) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Accordian not found')
  }

  // Now, update the Accordian
  const updateAccordianId = parseInt(id)
  const updated_Accordian_data = await prisma.productAccordian.update({
    where: {
      id: updateAccordianId,
    },
    data: accordian_data,
  })

  return updated_Accordian_data
}

const deleteAccordian = async (
  id: string,
  user: JwtPayload
): Promise<ProductAccordian | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to delete Accordian'
    )
  }

  const existingAccordianId = parseInt(id)
  const existingAccordian = await prisma.productAccordian.findUnique({
    where: {
      id: existingAccordianId,
    },
  })

  if (!existingAccordian) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Accordian not found')
  }

  // Now, delete the Accordian
  const deleteAccordianId = parseInt(id)

  const deleteAccordian = await prisma.productAccordian.delete({
    where: {
      id: deleteAccordianId,
    },
  })

  return deleteAccordian
}

export const AccordianService = {
  createProductAccordian,
  allproductAccordian,
  updateAccordian,
  deleteAccordian,
}
