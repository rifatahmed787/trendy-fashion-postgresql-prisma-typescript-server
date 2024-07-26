import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductColorService } from './productColor.service'

// Create color
const createcolor = catchAsync(async (req: Request, res: Response) => {
  const { ...color_data } = req.body
  const user_data = req.logged_in_user
  const result = await ProductColorService.createProductcolor(
    color_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'color created successfully',
  })
})

const getcolor = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const result = await ProductColorService.getcolor(user)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'color retrieved successfully',
  })
})

const updatecolor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...color_data } = req.body
  const result = await ProductColorService.updatecolor(id, color_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'color updated successfully',
  })
})

const deletecolor = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const { id } = req.params
  const result = await ProductColorService.deletecolor(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'color deleted successfully',
  })
})

export const ProductColorController = {
  createcolor,
  getcolor,
  updatecolor,
  deletecolor,
}
