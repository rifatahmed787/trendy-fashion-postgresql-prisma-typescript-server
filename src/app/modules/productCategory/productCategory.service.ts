import { PrismaClient, ProductCategory, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const createProductCategory = async (
  category_data: ProductCategory,
  user: JwtPayload
): Promise<ProductCategory | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create category'
    )
  }

  const createCategory = await prisma.productCategory.create({
    data: category_data,
  })
  return createCategory
}

const getCategory = async (): Promise<ProductCategory[]> => {
  const getData = await prisma.productCategory.findMany()
  return getData
}

const updateCategory = async (
  id: string,
  category_data: Partial<ProductCategory>,
  user: JwtPayload
): Promise<ProductCategory | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update category'
    )
  }

  const existingCategoryId = parseInt(id)
  const existingCategory = await prisma.productCategory.findUnique({
    where: {
      id: existingCategoryId,
    },
  })

  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found')
  }

  // Now, update the category
  const updateCategoryId = parseInt(id)
  const updated_category_data = await prisma.productCategory.update({
    where: {
      id: updateCategoryId,
    },
    data: category_data,
  })

  return updated_category_data
}

const deleteCategory = async (
  id: string,
  user: JwtPayload
): Promise<ProductCategory | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update category'
    )
  }

  const existingCategoryId = parseInt(id)
  const existingCategory = await prisma.productCategory.findUnique({
    where: {
      id: existingCategoryId,
    },
  })

  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found')
  }

  // Now, delete the category
  const deleteCategoryId = parseInt(id)

  const deleteCategory = await prisma.productCategory.delete({
    where: {
      id: deleteCategoryId,
    },
  })

  return deleteCategory
}

export const ProductCategoryService = {
  createProductCategory,
  getCategory,
  updateCategory,
  deleteCategory,
}
