import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SliderService } from './slider.service'

// Create slider
const createSlider = catchAsync(async (req: Request, res: Response) => {
  const { ...slider_data } = req.body
  const user_data = req.logged_in_user
  const result = await SliderService.create_slider(slider_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Slider created successfully',
  })
})

const getSlider = catchAsync(async (req: Request, res: Response) => {
  const result = await SliderService.getSlider()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Slider retrieved successfully',
  })
})

const updateSlider = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...slider_data } = req.body
  const result = await SliderService.update_slider(id, slider_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Slider updated successfully',
  })
})

export const SliderController = {
  createSlider,
  getSlider,
  updateSlider,
}
