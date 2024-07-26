import { PrismaClient, ProductTag, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const createProductTag = async (
  Tag_data: ProductTag,
  user: JwtPayload
): Promise<ProductTag | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can create Tag')
  }

  const createTag = await prisma.productTag.create({
    data: Tag_data,
  })
  return createTag
}

const getTag = async (user: JwtPayload): Promise<ProductTag[]> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can get the Tag')
  }

  const getData = await prisma.productTag.findMany()
  return getData
}

const updateTag = async (
  id: string,
  Tag_data: Partial<ProductTag>,
  user: JwtPayload
): Promise<ProductTag | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update Tag'
    )
  }

  const existingTagId = parseInt(id)
  const existingTag = await prisma.productTag.findUnique({
    where: {
      id: existingTagId,
    },
  })

  if (!existingTag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found')
  }

  // Now, update the Tag
  const updateTagId = parseInt(id)
  const updated_Tag_data = await prisma.productTag.update({
    where: {
      id: updateTagId,
    },
    data: Tag_data,
  })

  return updated_Tag_data
}

const deleteTag = async (
  id: string,
  user: JwtPayload
): Promise<ProductTag | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update Tag'
    )
  }

  const existingTagId = parseInt(id)
  const existingTag = await prisma.productTag.findUnique({
    where: {
      id: existingTagId,
    },
  })

  if (!existingTag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found')
  }

  // Now, delete the Tag
  const deleteTagId = parseInt(id)

  const deleteTag = await prisma.productTag.delete({
    where: {
      id: deleteTagId,
    },
  })

  return deleteTag
}

export const ProductTagService = {
  createProductTag,
  getTag,
  updateTag,
  deleteTag,
}
