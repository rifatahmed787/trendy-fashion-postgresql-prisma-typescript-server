import { pagination_map } from '../../../helpers/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { IPagination } from '../../../interfaces/pagination'
import { filter_product_conditions } from './product.condition'
import ApiError from '../../errors/ApiError'
import {
  IProductFilter,
  IProductFilteringItems as IProductUniqueFilteringItems,
} from './product.interface'
import httpStatus from 'http-status'
import { Products, PrismaClient, Role, Prisma } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
const prisma = new PrismaClient()

// Create new product
const create_new_product = async (
  product_data: Products,
  user: JwtPayload
): Promise<Products | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create products'
    )
  }

  const created_product = await prisma.products.create({
    data: product_data,
  })

  return created_product
}

// get all the products
const get_all_products = async (
  filters: IProductFilter,
  pagination_data: Partial<IPagination>,
  search: string
): Promise<GenericResponse<Products[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // Define conditions for filters
  const filterConditions = filter_product_conditions(filters) ?? {}

  // Scalar fields search conditions
  const scalarSearchConditions: Prisma.ProductsWhereInput = search
    ? {
        OR: [
          {
            productName: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            productGender: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
    : {}

  // Related fields search conditions
  const relatedSearchConditions: Prisma.ProductsWhereInput = search
    ? {
        OR: [
          {
            productCategory: {
              categoryName: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
          {
            productType: {
              typeName: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
          {
            productBrand: {
              brandName: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
          {
            productSizes: {
              hasSome: [search],
            },
          },
          {
            productColors: {
              hasSome: [search.toLowerCase()],
            },
          },
          {
            tags: {
              hasSome: [search.toLowerCase()],
            },
          },
          {
            ages: {
              hasSome: [search.toLowerCase()],
            },
          },
        ],
      }
    : {}

  // Combine scalar and related search conditions with filters
  const whereConditions: Prisma.ProductsWhereInput = {
    AND: [
      filterConditions,
      {
        OR: [scalarSearchConditions, relatedSearchConditions],
      },
    ],
  }

  // Fetch the products
  const allProducts = await prisma.products.findMany({
    where: whereConditions,
    orderBy: sortObject,
    skip: skip,
    take: limit,
    include: {
      productReviews: true,
      productCategory: true,
      productType: true,
    },
  })

  // Count the total number of matching products
  const total = await prisma.products.count({
    where: whereConditions,
  })

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: allProducts,
  }
}

//  latestTenproducts
const latest_ten_products = async (): Promise<Products[] | null> => {
  const latestProducts = await prisma.products.findMany({
    take: 50,
    orderBy: { id: 'desc' },
    include: {
      productReviews: true,
      productCategory: true,
      productType: true,
    },
  })

  return latestProducts
}

//best seller
const bestSellingProducts = async (): Promise<Products[] | null> => {
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
      productCategory: true,
      productType: true,
    },
  })

  return bestSellers
}

//  gel_all_category
const get__unique_filtering_items =
  async (): Promise<GenericResponse<IProductUniqueFilteringItems> | null> => {
    // and conditions (for search and  filter)
    const distinctGender = await prisma.products.groupBy({
      by: ['productGender'],
    })

    const distinctCategories = await prisma.productCategory.groupBy({
      by: ['categoryName'],
    })
    const distinctTypes = await prisma.productType.groupBy({
      by: ['typeName'],
    })

    // Get the minimum and maximum product prices
    const priceRange = await prisma.products.aggregate({
      _min: {
        productPrice: true,
      },
      _max: {
        productPrice: true,
      },
    })

    const allGender = distinctGender.map(item => item.productGender)
    const allCategories = distinctCategories.map(item => item.categoryName)
    const allTypes = distinctTypes.map(item => item.typeName)

    return {
      data: {
        all_gender: allGender,
        all_category: allCategories,
        all_type: allTypes,
        all_price: [priceRange._min.productPrice, priceRange._max.productPrice],
      },
    }
  }

//products details
const get_product_details = async (id: string): Promise<Products | null> => {
  const productId = parseInt(id)

  const productDetails = await prisma.products.findUnique({
    where: {
      id: productId,
    },
    include: {
      productReviews: {
        include: {
          reviewer: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      },
      productCategory: true,
      productType: true,
    },
  })

  if (!productDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  return productDetails
}

// Update products
const update_product = async (
  id: string,
  product_data: Partial<Products>,
  user: JwtPayload
): Promise<Products | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
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
  const updated_product_data = await prisma.products.update({
    where: {
      id: updateProductId,
    },
    data: product_data,
  })

  return updated_product_data
}

//  Delete product
const delete_product = async (
  id: string,
  user: JwtPayload
): Promise<Products | null> => {
  // Check if the user is an admin
  if (user.role !== 'ADMIN') {
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

export const ProductServices = {
  create_new_product,
  update_product,
  get_all_products,
  get_product_details,
  delete_product,
  get__unique_filtering_items,
  latest_ten_products,
  bestSellingProducts,
}
