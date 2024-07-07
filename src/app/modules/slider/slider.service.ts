import { PrismaClient, Role, slider } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const create_slider = async (
  slider_data: slider,
  user: JwtPayload
): Promise<slider | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create products'
    )
  }

  const createSlider = await prisma.slider.create({
    data: slider_data,
  })
  return createSlider
}

const getSlider = async (): Promise<slider[]> => {
  const getData = await prisma.slider.findMany()
  return getData
}

export const SliderService = {
  create_slider,
  getSlider,
}
