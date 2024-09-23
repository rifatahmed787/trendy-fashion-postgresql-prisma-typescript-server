import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductTypeService } from './productType.service'
import { pagination_keys } from '../../../constant/common'
import pick from '../../../shared/pick'

// Create Type
const createType = catchAsync(async (req: Request, res: Response) => {
  const { ...Type_data } = req.body
  const user_data = req.logged_in_user
  const result = await ProductTypeService.createProductType(
    Type_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Type created successfully',
  })
})

const getType = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const pagination = pick(req.query, pagination_keys)
  const search = req.query.search?.toString() || ''
  const result = await ProductTypeService.getType(pagination, search, user)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Type retrieved successfully',
  })
})

const updateType = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...Type_data } = req.body
  const result = await ProductTypeService.updateType(id, Type_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Type updated successfully',
  })
})

const deleteType = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const { id } = req.params
  const result = await ProductTypeService.deleteType(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Type deleted successfully',
  })
})

export const ProductTypeController = {
  createType,
  getType,
  updateType,
  deleteType,
}
