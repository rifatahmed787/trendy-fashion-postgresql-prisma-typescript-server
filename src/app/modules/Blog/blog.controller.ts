import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { Request, Response } from 'express'
import pick from '../../../shared/pick'
import { blog_filter_keys } from './blog.constant'
import { pagination_keys } from '../../../constant/common'
import { BlogServices } from './blog.services'

const createBlogCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...blog_category } = req.body
  const user_data = req.logged_in_user
  const result = await BlogServices.createBlogCetagory(blog_category, user_data)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category created successfully',
  })
})

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { ...blog_data } = req.body
  const user_data = req.logged_in_user
  const result = await BlogServices.blogCreate(blog_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Blog created successfully',
  })
})

const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, blog_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await BlogServices.get_all_blogs(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Blogs retrieved successfully',
  })
})

export const BlogController = {
  createBlog,
  getBlogs,
  createBlogCategory,
}
