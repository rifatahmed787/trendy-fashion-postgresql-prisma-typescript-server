import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductCategoryService } from './productCategory.service'
import { pagination_keys } from '../../../constant/common'
import pick from '../../../shared/pick'

// Create category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...category_data } = req.body
  const user_data = req.logged_in_user
  const result = await ProductCategoryService.createProductCategory(
    category_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category created successfully',
  })
})

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const pagination = pick(req.query, pagination_keys)
  const search = req.query.search?.toString() || ''
  const result = await ProductCategoryService.getCategory(
    pagination,
    search,
    user
  )
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category retrieved successfully',
  })
})

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...category_data } = req.body
  const result = await ProductCategoryService.updateCategory(
    id,
    category_data,
    user
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category updated successfully',
  })
})

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const { id } = req.params
  const result = await ProductCategoryService.deleteCategory(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category deleted successfully',
  })
})

export const ProductCategoryController = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
}
