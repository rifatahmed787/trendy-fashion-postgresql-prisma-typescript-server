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
  const productAccordian = await prisma.productAccordian.findMany({})
  return productAccordian
}

// get payments accordian

export const AccordianService = {
  createProductAccordian,
  allproductAccordian,
}
