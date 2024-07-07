import { CartProduct } from '@prisma/client'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { OrderService } from './order.services'
import pick from '../../../shared/pick'
import { pagination_keys } from '../../../constant/common'

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const pagination = pick(req.query, pagination_keys)
  const result = await OrderService.getAllOrder(user, pagination)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Retrieve all orders successfully',
  })
})

// get wish list data
const getOrderProductByUser = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderService.getOrderProductByUser(
      req.logged_in_user?.id
    )

    sendResponse<CartProduct[], null>(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Retrieve Order successfully!',
    })
  }
)

export const OrderController = {
  getOrderProductByUser,
  getAllOrder,
}
