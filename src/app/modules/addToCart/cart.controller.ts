import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { CartServices } from './cart.services'
import { CartProduct } from '@prisma/client'

// post review]
const addToCart = catchAsync(async (req: Request, res: Response) => {
  const { ...cart_data } = req.body
  const userId = req.logged_in_user.id
  // console.log(cart_data.productId)
  const result = await CartServices.add_to_cart(userId, cart_data.productId)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product added to your cart successfully!',
  })
})

// getBookReviews
// const getCart = catchAsync(async (req: Request, res: Response) => {
//   const result = await CartServices.get_cart_by_user_id(
//     req.logged_in_user?._id as string
//   )

//   sendResponse<ICart[], null>(res, {
//     status_code: httpStatus.OK,
//     success: true,
//     data: result,
//     message: 'Cart data retrieve successfully',
//   })
// })

// delete from review
// const removeFromCart = catchAsync(async (req: Request, res: Response) => {
//   const { ...cart_data } = req.body
//   const result = await CartServices.remove_from_cart(cart_data)

//   sendResponse<ICart, null>(res, {
//     status_code: httpStatus.OK,
//     success: true,
//     data: result,
//     message: 'Book removed from your cart successfully !',
//   })
// })

export const CartController = {
  addToCart,
}
