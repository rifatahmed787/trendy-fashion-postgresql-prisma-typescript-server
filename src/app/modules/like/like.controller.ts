import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { LikeServices } from './like.service'
import sendResponse from '../../../shared/sendResponse'
import { PostLike } from '@prisma/client'
import httpStatus from 'http-status'
// post comment
const postLike = catchAsync(async (req: Request, res: Response) => {
  const { ...like_data } = req.body
  const likerId = req.logged_in_user.id

  const result = await LikeServices.postLike(like_data, likerId)

  sendResponse<PostLike, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Your Like placed successfully !',
  })
})

export const LikeController = {
  postLike,
}
