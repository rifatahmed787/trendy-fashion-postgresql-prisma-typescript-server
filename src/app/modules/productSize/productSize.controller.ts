import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductSizeService } from './productSize.service'

// Create Size
const createSize = catchAsync(async (req: Request, res: Response) => {
  const { ...Size_data } = req.body
  const user_data = req.logged_in_user
  const result = await ProductSizeService.createProductSize(
    Size_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Size created successfully',
  })
})

const getSize = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const result = await ProductSizeService.getSize(user)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Size retrieved successfully',
  })
})

const updateSize = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...Size_data } = req.body
  const result = await ProductSizeService.updateSize(id, Size_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Size updated successfully',
  })
})

const deleteSize = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const { id } = req.params
  const result = await ProductSizeService.deleteSize(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Size deleted successfully',
  })
})

export const ProductSizeController = {
  createSize,
  getSize,
  updateSize,
  deleteSize,
}
