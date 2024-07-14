import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { Address, PrismaClient, User } from '@prisma/client'
import { pagination_map } from '../../../helpers/pagination'
import { IPagination } from '../../../interfaces/pagination'
import { JwtPayload } from 'jsonwebtoken'

const prisma = new PrismaClient()
//MY  profile
const my_profile = async (userId: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      role: true,
      address: {
        select: {
          id: true,
          street_address: true,
          city: true,
          postal_code: true,
          country: true,
          phone_number: true,
          district_name: true,
        },
      },
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // we can return only the necessary fields if we want a partial user profile.
  return user
}

// get all the user
const allUsers = async (
  pagination_data: Partial<IPagination>
): Promise<{
  meta: { page: number; limit: number; total: number }
  data: User[]
}> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // Count the total number of users
  const total = await prisma.user.count()

  const users = await prisma.user.findMany({
    orderBy: sortObject || { id: 'asc' },
    skip: skip,
    take: limit,
    include: {
      address: true,
      reviewProducts: true,
    },
  })

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: users,
  }
}

const createAddress = async (
  userId: string,
  address_data: Address
): Promise<Address | null> => {
  const userParseId = parseInt(userId)

  const user = await prisma.user.findUnique({
    where: {
      id: userParseId,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const address = await prisma.address.create({
    data: {
      street_address: address_data.street_address,
      city: address_data.city,
      postal_code: address_data.postal_code,
      country: address_data.country,
      phone_number: address_data.phone_number,
      district_name: address_data.district_name,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  })

  return address
}

const updateUser = async (
  userId: string,
  user_data: User
): Promise<User | null> => {
  const userParseId = parseInt(userId)

  const user = await prisma.user.findUnique({
    where: {
      id: userParseId,
    },
    include: {
      address: true,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const userDataWithAddress = user_data as User & { address?: Address }

  // Update the user's address if it exists
  if (userDataWithAddress.address) {
    await prisma.address.update({
      where: {
        id: user?.address?.id,
      },
      data: {
        street_address: userDataWithAddress.address.street_address,
        city: userDataWithAddress.address.city,
        postal_code: userDataWithAddress.address.postal_code,
        country: userDataWithAddress.address.country,
        phone_number: userDataWithAddress.address.phone_number,
        district_name: userDataWithAddress.address.district_name,
      },
    })
  }
  // Update other fields of the user if needed
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      username: user_data.username,
      avatar: user_data.avatar,
    },
  })

  return updatedUser
}

const update_user_superadmin = async (
  id: string,
  user: JwtPayload
): Promise<User | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update user'
    )
  }

  const existingUserId = parseInt(id)
  const existingUser = await prisma.user.findUnique({
    where: {
      id: existingUserId,
    },
  })

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Now, update the User's role to SUPERADMIN
  const updatedUser = await prisma.user.update({
    where: {
      id: existingUserId,
    },
    data: {
      role: 'SUPERADMIN',
    },
  })

  return updatedUser
}
const update_user_admin = async (
  id: string,
  user: JwtPayload
): Promise<User | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'SUPERADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update user'
    )
  }

  const existingUserId = parseInt(id)
  const existingUser = await prisma.user.findUnique({
    where: {
      id: existingUserId,
    },
  })

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Now, update the User's role to SUPERADMIN
  const updatedUser = await prisma.user.update({
    where: {
      id: existingUserId,
    },
    data: {
      role: 'ADMIN',
    },
  })

  return updatedUser
}

export const UserServices = {
  my_profile,
  allUsers,
  createAddress,
  updateUser,
  update_user_superadmin,
  update_user_admin,
}
