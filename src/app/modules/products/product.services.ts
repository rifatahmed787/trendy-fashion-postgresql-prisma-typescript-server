import { pagination_map } from '../../../helpers/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { filter_cloth_conditions } from './product.condition'
import ApiError from '../../errors/ApiError'
import {
  IClothFilter,
  IClothFilteringItems as IClothUniqueFilteringItems,
} from './product.interface'
import httpStatus from 'http-status'
import { Products, PrismaClient } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
const prisma = new PrismaClient()

// Create new cloth product
const create_new_cloth = async (
  cloth_data: Products,
  user: JwtPayload
): Promise<Products | null> => {
  // Check if the user is an admin
  if (user.role !== 'admin') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create products'
    )
  }

  const created_cloth = await prisma.products.create({
    data: cloth_data,
  })

  return created_cloth
}

//  gel_all_cloths
const get_all_cloths = async (
  filters: IClothFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<Products[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // Define conditions (for search and filter)
  const filterConditions = filter_cloth_conditions(filters) ?? {}

  // Use the dynamic 'sortObject' in the 'orderBy' clause
  const allCloths = await prisma.products.findMany({
    where: filterConditions,
    orderBy: sortObject,
    skip: skip,
    take: limit,
    include: {
      productReviews: true,
    },
  })

  // Get the total count of cloth products that match the conditions
  const total = await prisma.products.count({
    where: filterConditions,
  })

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: allCloths,
  }
}

//  latestTenCloths
const latest_ten_cloths = async (): Promise<Products[] | null> => {
  const latestCloths = await prisma.products.findMany({
    take: 50,
    orderBy: { id: 'desc' },
    include: {
      productReviews: true,
    },
  })

  return latestCloths
}

//best seller
const bestSellingCloths = async (): Promise<Products[] | null> => {
  const bestSellers = await prisma.products.findMany({
    where: {
      productRating: {
        gte: 4,
      },
    },
    orderBy: {
      productRating: 'desc',
    },
    take: 10,
    include: {
      productReviews: true,
    },
  })

  return bestSellers
}

//  gel_all_category
const get__unique_filtering_items =
  async (): Promise<GenericResponse<IClothUniqueFilteringItems> | null> => {
    // and conditions (for search and filter)
    const distinctAges = await prisma.products.groupBy({
      by: ['age'],
    })

    const distinctCategories = await prisma.products.groupBy({
      by: ['productCategory'],
    })

    const allAges = distinctAges.map(item => item.age).flat() as (
      | string
      | null
    )[]
    const allCategories = distinctCategories.map(item => item.productCategory)

    return {
      data: {
        all_age: allAges,
        all_category: allCategories,
      },
    }
  }

//products detail
const get_cloths_details = async (id: string): Promise<Products | null> => {
  const clothId = parseInt(id)
  const isExist = await prisma.products.findUnique({
    where: {
      id: clothId,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cloth not found')
  }

  const clothDetails = await prisma.products.findUnique({
    where: {
      id: clothId,
    },
    include: {
      productReviews: true,
    },
  })

  return clothDetails
}

// Update cloths
const update_cloth = async (
  id: string,
  cloth_data: Partial<Products>,
  user: JwtPayload
): Promise<Products | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'admin') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update products'
    )
  }

  const existingProductId = parseInt(id)
  const existingProduct = await prisma.products.findUnique({
    where: {
      id: existingProductId,
    },
  })

  if (!existingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  // Now, update the product
  const updateProductId = parseInt(id)
  const updated_cloth_data = await prisma.products.update({
    where: {
      id: updateProductId,
    },
    data: cloth_data,
  })

  return updated_cloth_data
}

//  Delete cloth
const delete_product = async (
  id: string,
  user: JwtPayload
): Promise<Products | null> => {
  // Check if the user is an admin
  if (user.role !== 'admin') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can delete products'
    )
  }

  const productId = parseInt(id)

  // Check if the product exists
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
    include: {
      productReviews: true,
      wishLists: true,
      cartProducts: true,
    },
  })

  if (!product) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to delete product'
    )
  }

  // Delete related data
  await prisma.productReview.deleteMany({
    where: {
      productId: productId,
    },
  })

  await prisma.wishList.deleteMany({
    where: {
      productId,
    },
  })

  await prisma.cartProduct.deleteMany({
    where: {
      productId,
    },
  })

  // Delete the product
  const deletedProduct = await prisma.products.delete({
    where: {
      id: productId,
    },
  })

  return deletedProduct
}

export const ClothServices = {
  create_new_cloth,
  update_cloth,
  get_all_cloths,
  get_cloths_details,
  delete_product,
  get__unique_filtering_items,
  latest_ten_cloths,
  bestSellingCloths,
}
