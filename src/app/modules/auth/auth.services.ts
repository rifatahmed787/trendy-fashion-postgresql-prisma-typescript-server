import { jwtHelper } from '../../../helpers/jwtHelper'
import config from '../../../config'
import { JwtPayload, Secret } from 'jsonwebtoken'
import { Address, PrismaClient, Role, User } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { IUserLoginResponse, UserWithResponse } from '../user/user.interface'

const prisma = new PrismaClient()

// user signup
const user_signup = async (
  user_data: User,
  deviceToken: string | undefined
): Promise<UserWithResponse> => {
  let hashedPassword: string | null = null
  // Check if password is provided, then hash it
  if (user_data.password) {
    hashedPassword = await bcrypt.hash(user_data.password, 10)
  }
  const avatar =
    user_data.avatar ||
    'https://res.cloudinary.com/dztlowlu0/image/upload/v1700031261/avatar_ylo9mt.png'
  const created_user = await prisma.user.create({
    data: {
      username: user_data.username,
      email: user_data.email,
      mobileNumber: user_data.mobileNumber,
      password: hashedPassword,
      role: user_data.role,
      avatar: avatar,
      isActive: true,
    },
  })

  const userWithoutPassword: Partial<User> = {
    id: created_user.id,
    username: created_user.username,
    email: created_user.email,
    mobileNumber: created_user.mobileNumber,
    role: created_user.role,
    avatar: created_user.avatar,
  }

  delete userWithoutPassword.password

  const accessToken = jwtHelper.create_token(
    {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      mobileNumber: userWithoutPassword.mobileNumber,
    },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )

  const refreshToken = jwtHelper.create_token(
    {
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      mobileNumber: userWithoutPassword.mobileNumber,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expiresIn as string
  )

  // Store the device token if provided
  if (deviceToken) {
    await prisma.deviceToken.create({
      data: {
        deviceToken,
      },
    })
  }

  return {
    user_details: created_user,
    accessToken,
    refreshToken,
  }
}
// admin create
const admin_create = async (
  user_data: User,
  user: JwtPayload
): Promise<UserWithResponse> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create admin or superadmin'
    )
  }
  let hashedPassword: string | null = null
  // Check if password is provided, then hash it
  if (user_data.password) {
    hashedPassword = await bcrypt.hash(user_data.password, 10)
  }
  const avatar =
    user_data.avatar ||
    'https://res.cloudinary.com/dztlowlu0/image/upload/v1700031261/avatar_ylo9mt.png'
  const created_user = await prisma.user.create({
    data: {
      username: user_data.username,
      email: user_data.email,
      password: hashedPassword,
      role: user_data.role,
      gender: user_data.gender,
      avatar: avatar,
      isActive: true,
    },
  })

  const userWithoutPassword: Partial<User> = {
    id: created_user.id,
    username: created_user.username,
    email: created_user.email,
    role: created_user.role,
    avatar: created_user.avatar,
  }

  delete userWithoutPassword.password

  const accessToken = jwtHelper.create_token(
    { id: userWithoutPassword.id, email: userWithoutPassword.email },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )

  const refreshToken = jwtHelper.create_token(
    { id: userWithoutPassword.id, email: userWithoutPassword.email },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expiresIn as string
  )

  return {
    user_details: created_user,
    accessToken,
    refreshToken,
  }
}

// user_login
const user_login = async (
  identifier: string, // email or mobileNumber
  password: string,
  deviceToken: string | undefined
): Promise<IUserLoginResponse | null> => {
  // Function to check if a user with a given email or mobileNumber exists
  const isUserExist = async (identifier: string): Promise<User | null> => {
    return prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { mobileNumber: identifier }],
      },
    })
  }

  const user = await isUserExist(identifier)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  // Validate password: ensure it's not null
  if (!user.password) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User has no password set')
  }

  // Function to compare a given password with the stored hashed password
  const isPasswordMatched = async (
    encrypted_pass: string,
    given_pass: string
  ): Promise<boolean> => {
    return bcrypt.compare(given_pass, encrypted_pass)
  }

  // Match password
  if (!(await isPasswordMatched(user.password, password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password')
  }

  // Ensure email is not null when generating the token
  const emailForToken = user.email ? user.email : ''
  const mobileNumberForToken = user.mobileNumber ? user.mobileNumber : ''

  // Create an access token
  const accessToken = jwtHelper.create_token(
    {
      id: user.id,
      email: emailForToken,
      role: user.role,
      mobileNumber: mobileNumberForToken,
    },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )

  // Create a refresh token
  const refreshToken = jwtHelper.create_token(
    { id: user.id, email: emailForToken, mobileNumber: mobileNumberForToken },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expiresIn as string
  )

  // Store the device token if provided
  if (deviceToken) {
    await prisma.deviceToken.create({
      data: {
        deviceToken,
      },
    })
  }

  // Return the response
  return {
    accessToken,
    refreshToken,
    user_details: {
      id: user.id,
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
      avatar: user.avatar,
      isActive: true,
    },
  }
}

//update user details
const createOrUpdateUserDetails = async (data: Address): Promise<Address> => {
  const isUserExist = await prisma.address.findUnique({
    where: {
      address_id: data.address_id,
    },
  })

  if (isUserExist) {
    const result = await prisma.address.update({
      where: {
        address_id: data.address_id,
      },
      data: {
        street_address: data.street_address,
        city: data.city,
        postal_code: data.postal_code,
        country: data.country,
        phone_number: data.phone_number,
        district_name: data.district_name,
      },
    })
    return result
  }
  const result = await prisma.address.create({
    data,
  })
  return result
}

// refresh_token
const refresh_token = async (
  token: string
): Promise<IUserLoginResponse | null> => {
  //  token verification
  let decoded_token = null
  try {
    decoded_token = jwtHelper.verify_token(
      token,
      config.jwt.refresh_token_secret as Secret
    )
  } catch (err) {
    // err
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token')
  }
  const { id, email } = decoded_token

  // user checking verification
  const isUserExist = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  const user = await isUserExist(email)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  // access token
  const accessToken = jwtHelper.create_token(
    { id, email },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )
  // refresh token
  const refreshToken = jwtHelper.create_token(
    { id, email },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expiresIn as string
  )

  return { accessToken, refreshToken, user_details: user }
}

export const AuthServices = {
  user_signup,
  admin_create,
  user_login,
  createOrUpdateUserDetails,
  refresh_token,
}
