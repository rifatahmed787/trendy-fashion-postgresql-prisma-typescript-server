import { PrismaClient, Role, sliderHero } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const create_slider_hero = async (
  slider_hero_data: sliderHero,
  user: JwtPayload
): Promise<sliderHero | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create slider hero'
    )
  }

  const createSliderHero = await prisma.sliderHero.create({
    data: slider_hero_data,
  })
  return createSliderHero
}

const getSliderHero = async (): Promise<sliderHero[]> => {
  const getData = await prisma.sliderHero.findMany()
  return getData
}

const update_slider_hero = async (
  id: string,
  slider_hero_data: Partial<sliderHero>,
  user: JwtPayload
): Promise<sliderHero | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update slider hero'
    )
  }

  const existingSliderId = parseInt(id)
  const existingSlider = await prisma.sliderHero.findUnique({
    where: {
      id: existingSliderId,
    },
  })

  if (!existingSlider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'slider hero not found')
  }

  // Now, update the slider hero
  const updateSliderId = parseInt(id)
  const updated_slider_data = await prisma.sliderHero.update({
    where: {
      id: updateSliderId,
    },
    data: slider_hero_data,
  })

  return updated_slider_data
}

export const SliderHeroService = {
  create_slider_hero,
  getSliderHero,
  update_slider_hero,
}
