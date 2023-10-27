import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

import pick from '../../../shared/pick'
import { product_filter_keys } from './product.constant'
import { pagination_keys } from '../../../constant/common'
import { ClothServices } from './product.services'

// Create cloth
const createCloth = catchAsync(async (req: Request, res: Response) => {
  const { ...cloth_data } = req.body
  const user_data = req.logged_in_user
  const result = await ClothServices.create_new_cloth(cloth_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product created successfully',
  })
})

//  update product
const updateCloth = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const user_data = req.logged_in_user

  const { ...cloth_data } = req.body
  const result = await ClothServices.update_cloth(id, cloth_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product updated successfully',
  })
})

//  Get all cloth
const allCloths = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, product_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await ClothServices.get_all_cloths(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product retrieved successfully',
  })
})
//  Get all latestTencloth
const latestTenCloths = catchAsync(async (req: Request, res: Response) => {
  const result = await ClothServices.latest_ten_cloths()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product retrieved successfully',
  })
})

//best seller
const bestSellingCloths = catchAsync(async (req: Request, res: Response) => {
  const result = await ClothServices.bestSellingCloths()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product retrieved successfully',
  })
})

//  Get all cloths
const uniqueFilteringData = catchAsync(async (req: Request, res: Response) => {
  const result = await ClothServices.get__unique_filtering_items()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Filtering Items retrieved successfully',
  })
})

//   Get cloth Details
const clothDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await ClothServices.get_cloths_details(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product details retrieved successfully',
  })
})

//  Delete cloth
const deleteCloth = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user_data = req.logged_in_user
  const result = await ClothServices.delete_product(id, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product deleted successfully',
  })
})

export const ClothController = {
  createCloth,
  clothDetails,
  updateCloth,
  deleteCloth,
  allCloths,
  uniqueFilteringData,
  latestTenCloths,
  bestSellingCloths,
}
