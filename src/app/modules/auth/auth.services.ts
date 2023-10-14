// import httpStatus from 'http-status'
// import ApiError from '../../errors/ApiError'
// import { IUser, IUserLogin, IUserLoginResponse } from '../user/user.interface'
import { jwtHelper } from '../../../helpers/jwtHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

type UserWithResponse = {
  user_details: User
  accessToken: string
  refreshToken: string
}

const user_signup = async (user_data: User): Promise<UserWithResponse> => {
  const created_user = await prisma.user.create({
    data: user_data,
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
// const user_login = async (
//   login_data: IUserLogin
// ): Promise<IUserLoginResponse | null> => {
//   const { email, password } = login_data

//   // Admin checking
//   const isUserExist = await User.isUserExist(email)

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
//   }

//   const { password: user_encrypted_password, ...othersUserData } = isUserExist

//   // match password;
//   if (
//     isUserExist &&
//     user_encrypted_password &&
//     !(await User.isPasswordMatched(user_encrypted_password, password))
//   ) {
//     throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid password')
//   }

//   // access token
//   const accessToken = jwtHelper.create_token(
//     { _id: othersUserData?._id, email: othersUserData?.email },
//     config.jwt.access_token_secret as Secret,
//     config.jwt.access_token_expiresIn as string
//   )
//   // refresh token
//   const refreshToken = jwtHelper.create_token(
//     { _id: othersUserData?._id, email: othersUserData?.email },
//     config.jwt.refresh_token_secret as Secret,
//     config.jwt.refresh_token_expiresIn as string
//   )

//   return { accessToken, refreshToken, user_details: isUserExist }
// }

// refresh_token
// const refresh_token = async (
//   token: string
// ): Promise<IUserLoginResponse | null> => {
//   //  token verification
//   let decoded_token = null
//   try {
//     decoded_token = jwtHelper.verify_token(
//       token,
//       config.jwt.refresh_token_secret as Secret
//     )
//   } catch (err) {
//     // err
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token')
//   }
//   const { _id, email } = decoded_token

//   // user checking verification
//   const isUserExist = await User.isUserExistByID(_id)
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid refresh token')
//   }

//   // access token
//   const accessToken = jwtHelper.create_token(
//     { _id, email },
//     config.jwt.access_token_secret as Secret,
//     config.jwt.access_token_expiresIn as string
//   )
//   // refresh token
//   const refreshToken = jwtHelper.create_token(
//     { _id, email },
//     config.jwt.refresh_token_secret as Secret,
//     config.jwt.refresh_token_expiresIn as string
//   )

//   return { accessToken, refreshToken, user_details: isUserExist }
// }

export const AuthServices = {
  user_signup,
  // user_login,
  // refresh_token,
}
