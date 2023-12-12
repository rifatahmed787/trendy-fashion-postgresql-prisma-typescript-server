import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '@prisma/client'
import { prisma } from '../../../config/database'

//MY  profile
const my_profile = async (userId: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    include: {
      address: true,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // we can return only the necessary fields if we want a partial user profile.
  return user
}

// get all the user
const allUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    include: {
      address: true,
      reviewProducts: true,
    },
  })
  return users
}

export const UserServices = {
  my_profile,
  allUsers,
}
