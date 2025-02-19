import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { Address, Prisma, PrismaClient, Role, User } from '@prisma/client'
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
      isActive: true,
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
  pagination_data: Partial<IPagination>,
  search: string
): Promise<{
  meta: { page: number; limit: number; total: number }
  data: User[]
}> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // Build whereCondition dynamically
  const whereCondition: Prisma.UserWhereInput = {}

  if (search) {
    whereCondition.OR = [
      { username: { contains: search, mode: Prisma.QueryMode.insensitive } },
      { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
    ]
  }

  // Count the total number of users based on filters
  const total = await prisma.user.count({
    where: whereCondition,
  })

  // Fetch users with filters, pagination, and sorting
  const users = await prisma.user.findMany({
    where: whereCondition,
    orderBy: sortObject || { id: 'asc' },
    skip,
    take: limit,
    include: {
      address: true,
      reviewProducts: true,
    },
  })

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: users,
  }
}

const admin_profile = async (userId: string): Promise<Partial<User> | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      password: true,
      gender: true,
      isActive: true,
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

// get all admin user
const adminUser = async (
  pagination_data: Partial<IPagination>,
  search = ''
): Promise<{
  meta: { page: number; limit: number; total: number }
  data: User[]
}> => {
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)

  // Count the total number of admin users
  const total = await prisma.user.count({
    where: {
      role: Role.ADMIN,
      AND: [
        search
          ? {
              OR: [
                {
                  username: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {},
      ],
    },
  })

  // Fetch active users with filters, pagination, and sorting
  const users = await prisma.user.findMany({
    where: {
      role: Role.ADMIN,
      AND: [
        search
          ? {
              OR: [
                {
                  username: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {},
      ],
    },
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
      gender: user_data.gender,
      password: user_data.password,
      email: user_data.email,
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

const delete_user = async (
  id: string,
  user: JwtPayload
): Promise<User | null> => {
  // Check if the user is an admin
  if (user.role !== 'ADMIN') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can delete user')
  }

  const userId = parseInt(id)

  // Check if the user exists
  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      reviewProducts: true,
      wishLists: true,
      cartProducts: true,
    },
  })

  if (!findUser) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete user')
  }

  // Delete related data
  await prisma.productReview.deleteMany({
    where: {
      reviewerId: userId,
    },
  })

  await prisma.wishList.deleteMany({
    where: {
      userId,
    },
  })

  await prisma.cartProduct.deleteMany({
    where: {
      userId,
    },
  })

  // Delete the user
  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  })

  return deletedUser
}

export const UserServices = {
  my_profile,
  admin_profile,
  allUsers,
  createAddress,
  updateUser,
  adminUser,
  update_user_superadmin,
  update_user_admin,
  delete_user,
}
