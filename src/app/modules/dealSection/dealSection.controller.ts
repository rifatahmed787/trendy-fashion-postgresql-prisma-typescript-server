import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { DealService } from './dealSection.service'

// Create deal
const createDeal = catchAsync(async (req: Request, res: Response) => {
  const { ...deal_data } = req.body
  const user_data = req.logged_in_user
  const result = await DealService.create_deal(deal_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'deal created successfully',
  })
})

const getDeal = catchAsync(async (req: Request, res: Response) => {
  const result = await DealService.getDeal()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'deal retrieved successfully',
  })
})

const updateDeal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...deal_data } = req.body
  const result = await DealService.update_deal(id, deal_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'deal updated successfully',
  })
})

export const DealController = {
  createDeal,
  getDeal,
  updateDeal,
}
