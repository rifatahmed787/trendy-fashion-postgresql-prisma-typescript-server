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
      'Only superadmin and admin users can create blogs'
    )
  }

  const create_blog_category = await prisma.postCategory.create({
    data: blog_category,
  })
  return create_blog_category
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
}
