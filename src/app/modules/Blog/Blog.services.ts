import { Post, PostCategory, PrismaClient, Role } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import { JwtPayload } from 'jsonwebtoken'
import httpStatus from 'http-status'
import { IBlogFilter } from './blog.interface'
import { IPagination } from '../../../interfaces/pagination'
import { GenericResponse } from '../../../interfaces/common'
import { pagination_map } from '../../../helpers/pagination'
import { filter_blog_conditions } from './blog.condition'
const prisma = new PrismaClient()

const createBlogCetagory = async (
  blog_category: PostCategory,
  user: JwtPayload
): Promise<PostCategory | null> => {
  if (user?.role !== Role.ADMIN || Role.SUPERADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only superadmin and admin users can create blogs category'
    )
  }

  const create_blog_category = await prisma.postCategory.create({
    data: blog_category,
  })
  return create_blog_category
}

// get all the post category
const get_blog_category = async (): Promise<PostCategory[] | null> => {
  const getBlogCategory = await prisma.postCategory.findMany({})
  return getBlogCategory
}

const update_blog_category = async (
  id: string,
  category_data: Partial<PostCategory>,
  user: JwtPayload
): Promise<PostCategory | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user?.role !== Role.ADMIN || Role.SUPERADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update post'
    )
  }

  const existingCategoryId = parseInt(id)
  const existingCategory = await prisma.postCategory.findUnique({
    where: {
      id: existingCategoryId,
    },
  })

  if (!existingCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }

  // Now, update the post category
  const updateCategoryId = parseInt(id)
  const updated_category_data = await prisma.postCategory.update({
    where: {
      id: updateCategoryId,
    },
    data: category_data,
  })

  return updated_category_data
}

const delete_category = async (
  id: string,
  user: JwtPayload
): Promise<PostCategory | null> => {
  // Check if the user is an admin or superadmin
  if (user?.role !== Role.ADMIN && user?.role !== Role.SUPERADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can delete post categories'
    )
  }

  const categoryId = parseInt(id)

  // Check if the category exists
  const category = await prisma.postCategory.findUnique({
    where: {
      id: categoryId,
    },
  })

  if (!category) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to delete post category'
    )
  }

  // Delete all posts in the category
  await prisma.post.deleteMany({
    where: {
      category_id: categoryId,
    },
  })

  // Delete the post category
  const deletedCategory = await prisma.postCategory.delete({
    where: {
      id: categoryId,
    },
  })

  return deletedCategory
}

const blogCreate = async (
  blog_data: Post,
  user: JwtPayload
): Promise<Post | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN || Role.SUPERADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only superadmin and admin users can create blogs'
    )
  }

  const create_blog = await prisma.post.create({
    data: blog_data,
  })

  return create_blog
}

//  gel_all blogs
const get_all_blogs = async (
  filters: IBlogFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<Post[]> | null> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // Define conditions (for search and filter)
  const filterConditions = filter_blog_conditions(filters) ?? {}

  // Use the dynamic 'sortObject' in the 'orderBy' clause
  const allBlogs = await prisma.post.findMany({
    where: filterConditions,
    orderBy: sortObject,
    skip: skip,
    take: limit,
    include: {
      comments: true,
      likes: true,
    },
  })

  // Get the total count of cloth products that match the conditions
  const total = await prisma.post.count({
    where: filterConditions,
  })

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: allBlogs,
  }
}

export const BlogServices = {
  blogCreate,
  get_all_blogs,
  createBlogCetagory,
  get_blog_category,
  update_blog_category,
  delete_category,
}
