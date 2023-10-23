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

export const ReviewController = {
  postReview,
}
