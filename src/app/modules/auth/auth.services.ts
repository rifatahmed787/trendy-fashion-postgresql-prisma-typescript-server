import { jwtHelper } from '../../../helpers/jwtHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import { Address, PrismaClient, User } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import bcrypt from 'bcrypt'
import { IUserLoginResponse, UserWithResponse } from '../user/user.interface'

const prisma = new PrismaClient()

// user signup
const user_signup = async (user_data: User): Promise<UserWithResponse> => {
  const hashedPassword = await bcrypt.hash(user_data.password, 10)

  const created_user = await prisma.user.create({
    data: {
      username: user_data.username,
      email: user_data.email,
      password: hashedPassword,
      role: user_data.role,
      avatar: user_data.avatar,
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
  email: string,
  password: string
): Promise<IUserLoginResponse | null> => {
  // Function to check if a user with a given email exists
  const isUserExist = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  const user = await isUserExist(email)

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  // Function to compare a given password with the stored hashed password
  const isPasswordMatched = async (
    encrypted_pass: string,
    given_pass: string
  ): Promise<boolean> => {
    const isMatch = await bcrypt.compare(given_pass, encrypted_pass)
    return isMatch
  }

  // Match password
  if (!(await isPasswordMatched(user.password, password))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password')
  }

  // Create an access token
  const accessToken = jwtHelper.create_token(
    { id: user.id, email: user.email },
    config.jwt.access_token_secret as Secret,
    config.jwt.access_token_expiresIn as string
  )

  // Create a refresh token
  const refreshToken = jwtHelper.create_token(
    { id: user.id, email: user.email },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expiresIn as string
  )

  // Return the response
  return {
    accessToken,
    refreshToken,
    user_details: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
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
  user_login,
  createOrUpdateUserDetails,
  refresh_token,
}
