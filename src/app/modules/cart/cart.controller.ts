import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { CartServices } from './cart.services'
import { CartProduct } from '@prisma/client'
import { cart_filter_keys } from './cart.constant'
import pick from '../../../shared/pick'
import { pagination_keys } from '../../../constant/common'

// post review]
const addToCart = catchAsync(async (req: Request, res: Response) => {
  const { ...cart_data } = req.body
  const userId = req.logged_in_user.id
  // console.log(cart_data.productId)
  const result = await CartServices.add_to_cart(userId, cart_data)

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
  const filters = pick(req.query, cart_filter_keys)
  const pagination = pick(req.query, pagination_keys)
  const user = req.logged_in_user
  const result = await CartServices.getCart(user, filters, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Retrieve all cart successfully',
  })
})

const makeAccept = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const cartProductId = Number(req.params.id)
  // console.log(cartProductId)

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
  // console.log(cartProductId)
  const result = await CartServices.rejectCart(user, cartProductId)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Rejected cart successfully',
  })
})
const makeOngoing = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const cartProductId = Number(req.params.id)
  // console.log(cartProductId)
  const result = await CartServices.onGoingProduct(user, cartProductId)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Ongoing product cart successfully',
  })
})
const makeShippingDone = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const cartProductId = Number(req.params.id)
  // console.log(cartProductId)
  const result = await CartServices.shippingDone(user, cartProductId)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Shipping done successfully',
  })
})
const makeShippingReturn = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const cartProductId = Number(req.params.id)
  // console.log(cartProductId)
  const result = await CartServices.returnProduct(user, cartProductId)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Shipping return successfully',
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

const updateColor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = req.body

  const userId = req.logged_in_user.id

  const result = await CartServices.update_color(userId, id, data)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Color updated successfully',
  })
})
const updateSize = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { data } = req.body

  const userId = req.logged_in_user.id

  const result = await CartServices.update_size(userId, id, data)

  sendResponse<CartProduct, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Size updated successfully',
  })
})

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.logged_in_user.id
  const { data } = req.body
  const result = await CartServices.createOrder(userId, data)

  sendResponse<CartProduct[], null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Order created successfully',
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
  updateColor,
  updateSize,
  createOrder,
  makeAccept,
  makeReject,
  makeOngoing,
  makeShippingDone,
  makeShippingReturn,
}
