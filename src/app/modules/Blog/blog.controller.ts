import httpStatus, { OK } from 'http-status'
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

const get_blog_category = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.get_blog_category()

  sendResponse(res, {
    status_code: OK,
    success: true,
    data: result,
    message: 'Blog category retrieve successfully',
  })
})

const update_blog_category = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...category_data } = req.body
  const user_data = req.logged_in_user
  const result = await BlogServices.update_blog_category(
    id,
    category_data,
    user_data
  )
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category updated successfully',
  })
})
const delete_blog_category = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user_data = req.logged_in_user
  const result = await BlogServices.delete_category(id, user_data)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category deleted successfully',
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
  get_blog_category,
  update_blog_category,
  delete_blog_category,
}
