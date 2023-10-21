import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { WishServices } from './wish.services'
import { WishList } from '@prisma/client'

// add to wish
const addToWish = catchAsync(async (req: Request, res: Response) => {
  const { ...wish_data } = req.body
  const userId = req.logged_in_user.id

  const result = await WishServices.addToWish(userId, wish_data.productId)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product added your wish list successfully !',
  })
})

// delete from wish list
const removeFromWish = catchAsync(async (req: Request, res: Response) => {
  const { ...wish_data } = req.body
  const userId = req.logged_in_user.id
  const result = await WishServices.removeFromWish(userId, wish_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product removed from your wish list successfully !',
  })
})

// get wish list data
const getWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await WishServices.getWishListByUserId(req.logged_in_user?.id)

  sendResponse<WishList[], null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Retrieve Wish list !',
  })
})

export const WishController = {
  addToWish,
  getWishList,
  removeFromWish,
}
