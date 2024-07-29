import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

import pick from '../../../shared/pick'
import { product_filter_keys } from './product.constant'
import { pagination_keys } from '../../../constant/common'
import { ProductServices } from './product.services'
import { generateProductId } from '../../../shared/uniqueId'

// Create product
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product_Id = generateProductId(5)
  const { ...product_data } = req.body
  if (!product_data.productId) {
    product_data.productId = product_Id
  }
  const user_data = req.logged_in_user
  const result = await ProductServices.create_new_product(
    product_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product created successfully',
  })
})

//  update product
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const user_data = req.logged_in_user

  const { ...product_data } = req.body
  const result = await ProductServices.update_product(
    id,
    product_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product updated successfully',
  })
})

//  Get all product
const allProducts = catchAsync(async (req: Request, res: Response) => {
  const filers = pick(req.query, product_filter_keys)
  const pagination = pick(req.query, pagination_keys)

  const result = await ProductServices.get_all_products(filers, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product retrieved successfully',
  })
})
//  Get all latestTenproducts
const latestTenProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.latest_ten_products()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product retrieved successfully',
  })
})

//best seller
const bestSellingProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.bestSellingProducts()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product retrieved successfully',
  })
})

//  Get all products
const uniqueFilteringData = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.get__unique_filtering_items()

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Filtering Items retrieved successfully',
  })
})

//   Get product Details
const productDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const result = await ProductServices.get_product_details(id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product details retrieved successfully',
  })
})

//  Delete product
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user_data = req.logged_in_user
  const result = await ProductServices.delete_product(id, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product deleted successfully',
  })
})

export const ProductController = {
  createProduct,
  productDetails,
  updateProduct,
  deleteProduct,
  allProducts,
  uniqueFilteringData,
  latestTenProducts,
  bestSellingProducts,
}
