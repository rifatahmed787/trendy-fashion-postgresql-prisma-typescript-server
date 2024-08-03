import { accordianCategory, PrismaClient, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const createAccordianCategory = async (
  category_data: accordianCategory,
  user: JwtPayload
): Promise<accordianCategory | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create category'
    )
  }

  const createCategory = await prisma.accordianCategory.create({
    data: category_data,
  })
  return createCategory
}

const getCategory = async (user: JwtPayload): Promise<accordianCategory[]> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can get category'
    )
  }
  const getData = await prisma.accordianCategory.findMany()
  return getData
}

const updateCategory = async (
  id: string,
  category_data: Partial<accordianCategory>,
  user: JwtPayload
): Promise<accordianCategory | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update category'
    )
  }

  const existingCategoryId = parseInt(id)
  const existingCategory = await prisma.accordianCategory.findUnique({
    where: {
      id: existingCategoryId,
    },
  })

  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found')
  }

  // Now, update the category
  const updateCategoryId = parseInt(id)
  const updated_category_data = await prisma.accordianCategory.update({
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
): Promise<accordianCategory | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update category'
    )
  }

  const existingCategoryId = parseInt(id)
  const existingCategory = await prisma.accordianCategory.findUnique({
    where: {
      id: existingCategoryId,
    },
  })

  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'category not found')
  }

  // Now, delete the category
  const deleteCategoryId = parseInt(id)

  const deleteCategory = await prisma.accordianCategory.delete({
    where: {
      id: deleteCategoryId,
    },
  })

  return deleteCategory
}

export const AccordianCategoryService = {
  createAccordianCategory,
  getCategory,
  updateCategory,
  deleteCategory,
}
