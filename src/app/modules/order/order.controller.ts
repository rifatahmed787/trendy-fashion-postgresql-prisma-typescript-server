import { CartProduct } from '@prisma/client'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { OrderService } from './order.services'

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
}
