import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { HeroSectionService } from './heroSection.service'

// Create Hero
const createHero = catchAsync(async (req: Request, res: Response) => {
  const { ...hero_data } = req.body
  const user_data = req.logged_in_user
  const result = await HeroSectionService.create_hero_section(
    hero_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Hero created successfully',
  })
})

const getHero = catchAsync(async (req: Request, res: Response) => {
  const result = await HeroSectionService.getHero()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Hero retrieved successfully',
  })
})

const updateHero = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...hero_data } = req.body
  const result = await HeroSectionService.update_hero(id, hero_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Hero updated successfully',
  })
})

export const HeroHeroController = {
  createHero,
  getHero,
  updateHero,
}
