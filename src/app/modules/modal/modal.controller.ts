import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ModalService } from './modal.service'

// Create modal
const createmodal = catchAsync(async (req: Request, res: Response) => {
  const { ...modal_data } = req.body
  const user_data = req.logged_in_user
  const result = await ModalService.create_modal(modal_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Modal created successfully',
  })
})

const getModal = catchAsync(async (req: Request, res: Response) => {
  const result = await ModalService.getModal()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Modal retrieved successfully',
  })
})

const updatemodal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...modal_data } = req.body
  const result = await ModalService.update_modal(id, modal_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Modal updated successfully',
  })
})

export const ModalController = {
  createmodal,
  getModal,
  updatemodal,
}
