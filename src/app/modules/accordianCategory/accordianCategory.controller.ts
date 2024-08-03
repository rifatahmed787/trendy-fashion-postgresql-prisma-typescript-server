import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { AccordianCategoryService } from './accordianCategory.service'

// Create category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { ...category_data } = req.body
  const user_data = req.logged_in_user
  const result = await AccordianCategoryService.createAccordianCategory(
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
  const result = await AccordianCategoryService.getCategory(user)
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
  const result = await AccordianCategoryService.updateCategory(
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
  const result = await AccordianCategoryService.deleteCategory(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Category deleted successfully',
  })
})

export const AccordianCategoryController = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
}
