import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { BrandNameService } from './brandName.service'
import { pagination_keys } from '../../../constant/common'
import pick from '../../../shared/pick'

// Create BrandName
const createBrandName = catchAsync(async (req: Request, res: Response) => {
  const { ...BrandName_data } = req.body
  const user_data = req.logged_in_user
  const result = await BrandNameService.createBrandName(
    BrandName_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'BrandName created successfully',
  })
})

const getBrandName = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const pagination = pick(req.query, pagination_keys)
  const search = req.query.search?.toString() || ''
  const result = await BrandNameService.getBrandName(pagination, search, user)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'BrandName retrieved successfully',
  })
})

const updateBrandName = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...BrandName_data } = req.body
  const result = await BrandNameService.updateBrandName(
    id,
    BrandName_data,
    user
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'BrandName updated successfully',
  })
})

const deleteBrandName = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const { id } = req.params
  const result = await BrandNameService.deleteBrandName(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'BrandName deleted successfully',
  })
})

export const BrandNameController = {
  createBrandName,
  getBrandName,
  updateBrandName,
  deleteBrandName,
}
