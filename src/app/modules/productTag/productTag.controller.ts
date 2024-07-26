import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ProductTagService } from './productTag.service'

// Create Tag
const createTag = catchAsync(async (req: Request, res: Response) => {
  const { ...Tag_data } = req.body
  const user_data = req.logged_in_user
  const result = await ProductTagService.createProductTag(Tag_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Tag created successfully',
  })
})

const getTag = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const result = await ProductTagService.getTag(user)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Tag retrieved successfully',
  })
})

const updateTag = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...Tag_data } = req.body
  const result = await ProductTagService.updateTag(id, Tag_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Tag updated successfully',
  })
})

const deleteTag = catchAsync(async (req: Request, res: Response) => {
  const user = req.logged_in_user
  const { id } = req.params
  const result = await ProductTagService.deleteTag(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Tag deleted successfully',
  })
})

export const ProductTagController = {
  createTag,
  getTag,
  updateTag,
  deleteTag,
}
