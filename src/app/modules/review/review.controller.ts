import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { ReviewServices } from './review.services'
import { ProductReview } from '@prisma/client'

// post review
const postReview = catchAsync(async (req: Request, res: Response) => {
  const { ...review_data } = req.body
  const reviewerId = req.logged_in_user.id
  // console.log('the reviewed data from controller', review_data)

  const result = await ReviewServices.post_review(review_data, reviewerId)

  sendResponse<ProductReview, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Your reviewed added successfully !',
  })
})

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const user_data = req.logged_in_user

  const { ...review_data } = req.body
  const result = await ReviewServices.update_review(id, review_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Review updated successfully',
  })
})

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user_data = req.logged_in_user
  const result = await ReviewServices.delete_review(id, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Review deleted successfully',
  })
})

export const ReviewController = {
  postReview,
  updateReview,
  deleteReview,
}
