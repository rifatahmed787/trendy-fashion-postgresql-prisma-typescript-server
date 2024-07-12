import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { LatestHeroService } from './latestSectionService'

// Create latest hero
const createLatestHero = catchAsync(async (req: Request, res: Response) => {
  const { ...latest_hero_data } = req.body
  const user_data = req.logged_in_user
  const result = await LatestHeroService.create_latest_hero(
    latest_hero_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'latest Hero created successfully',
  })
})

const getLatestHero = catchAsync(async (req: Request, res: Response) => {
  const result = await LatestHeroService.getLatestHero()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'latest hero retrieved successfully',
  })
})

const updateLatestHero = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...latest_hero_data } = req.body
  const result = await LatestHeroService.update_latest_hero(
    id,
    latest_hero_data,
    user
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'latest hero updated successfully',
  })
})

export const LatestHeroController = {
  createLatestHero,
  getLatestHero,
  updateLatestHero,
}
