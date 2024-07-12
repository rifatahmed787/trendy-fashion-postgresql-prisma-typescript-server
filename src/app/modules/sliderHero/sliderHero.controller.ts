import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { SliderHeroService } from './sliderHero.service'

// Create slider hero
const createSliderHero = catchAsync(async (req: Request, res: Response) => {
  const { ...slider_hero_data } = req.body
  const user_data = req.logged_in_user
  const result = await SliderHeroService.create_slider_hero(
    slider_hero_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Slider Hero created successfully',
  })
})

const getSliderHero = catchAsync(async (req: Request, res: Response) => {
  const result = await SliderHeroService.getSliderHero()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Slider hero retrieved successfully',
  })
})

const updateSliderHero = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...slider_hero_data } = req.body
  const result = await SliderHeroService.update_slider_hero(
    id,
    slider_hero_data,
    user
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Slider hero updated successfully',
  })
})

export const SliderController = {
  createSliderHero,
  getSliderHero,
  updateSliderHero,
}
