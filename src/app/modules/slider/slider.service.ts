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
      'Only admin users can create slider'
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

const update_slider = async (
  id: string,
  slider_data: Partial<slider>,
  user: JwtPayload
): Promise<slider | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update slider'
    )
  }

  const existingSliderId = parseInt(id)
  const existingSlider = await prisma.slider.findUnique({
    where: {
      id: existingSliderId,
    },
  })

  if (!existingSlider) {
    throw new ApiError(httpStatus.NOT_FOUND, 'slider not found')
  }

  // Now, update the slider
  const updateSliderId = parseInt(id)
  const updated_slider_data = await prisma.slider.update({
    where: {
      id: updateSliderId,
    },
    data: slider_data,
  })

  return updated_slider_data
}

export const SliderService = {
  create_slider,
  getSlider,
  update_slider,
}
