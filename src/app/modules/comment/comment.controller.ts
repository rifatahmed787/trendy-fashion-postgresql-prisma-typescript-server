import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { CommentServices } from './comment.service'
import sendResponse from '../../../shared/sendResponse'
import { PostComment } from '@prisma/client'

// post comment
const postComment = catchAsync(async (req: Request, res: Response) => {
  const { ...comment_data } = req.body
  const commenterId = req.logged_in_user.id

  const result = await CommentServices.post_comment(comment_data, commenterId)

  sendResponse<PostComment, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Your Comment added successfully !',
  })
})

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params

  const user_data = req.logged_in_user

  const { ...comment_data } = req.body
  const result = await CommentServices.update_comment(
    id,
    comment_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Comment updated successfully',
  })
})

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user_data = req.logged_in_user
  const result = await CommentServices.delete_comment(id, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Comment deleted successfully',
  })
})

export const CommentController = {
  postComment,
  updateComment,
  deleteComment,
}
