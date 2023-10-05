import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { IWish } from './wish.interface'
import { WishServices } from './wish.services'

// post review]
const addToWish = catchAsync(async (req: Request, res: Response) => {
  const { ...wish_data } = req.body
  const result = await WishServices.ad_to_wish(wish_data)

  sendResponse<IWish, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message:
      'Book added in your wish list successfully ! , you can check in your wish list.',
  })
})

// delete from review
const removeFromWish = catchAsync(async (req: Request, res: Response) => {
  const { ...wish_data } = req.body
  const result = await WishServices.remove_from_wish(wish_data)

  sendResponse<IWish, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Book removed from your wish list successfully !',
  })
})

// getBookReviews
const getWishList = catchAsync(async (req: Request, res: Response) => {
  const result = await WishServices.get_wish_list_by_user_id(
    req.logged_in_user?._id as string
  )

  sendResponse<IWish[], null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Wish list ',
  })
})

export const WishController = {
  addToWish,
  getWishList,
  removeFromWish,
}
