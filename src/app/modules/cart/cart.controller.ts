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

// get all cart data
const getCart = catchAsync(async (req: Request, res: Response) => {
  const result = await CartServices.get_cart_by_user_id(req.logged_in_user?.id)

  sendResponse<CartProduct[], null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Cart data retrieve successfully',
  })
})

// get all the cart
const getAllCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const result = await CartServices.getCart(user)

  sendResponse<CartProduct[], null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Retrieve all cart successfully',
  })
})

const makeAccept = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const cartProductId = Number(req.params.id)
  console.log(cartProductId)

  const result = await CartServices.acceptCart(user, cartProductId)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Accepted cart successfully',
  })
})

const makeReject = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const cartProductId = Number(req.params.id)
  console.log(cartProductId)
  const result = await CartServices.rejectCart(user, cartProductId)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Rejected cart successfully',
  })
})

// cartController.ts
const updateQuantity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { quantity } = req.body

  const userId = req.logged_in_user.id

  const result = await CartServices.update_quantity(userId, id, quantity)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Quantity and Total price updated successfully',
  })
})

// delete from cart
const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const { ...cart_data } = req.body
  const userId = req.logged_in_user.id
  // console.log(cart_data.id, userId)
  const result = await CartServices.remove_from_cart(userId, cart_data.id)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Product removed from your cart successfully !',
  })
})

const clear_cart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.logged_in_user.id
  const deletedCartProducts = await CartServices.clear_cart(userId)

  sendResponse<CartProduct[], null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: deletedCartProducts,
    message: 'Cart cleared successfully',
  })
})

export const CartController = {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
  clear_cart,
  getAllCart,
  makeAccept,
  makeReject,
}
