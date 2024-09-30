import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { AuthServices } from './auth.services'

import { User } from '@prisma/client'
import { IUserLoginResponse } from '../user/user.interface'
import { verifyOTP } from './otpService'

// signup user
const signupUser = catchAsync(async (req: Request, res: Response) => {
  const { otp, userIdentifier, deviceToken, ...user_data } = req.body
  // Verify the OTP first
  const otpVerificationResult = await verifyOTP(userIdentifier, otp)

  if (!otpVerificationResult.success) {
    // If OTP verification fails, send an error response
    return sendResponse<null, null>(res, {
      status_code: httpStatus.BAD_REQUEST,
      success: false,
      data: null,
      message: 'OTP verification failed',
    })
  }
  const result = await AuthServices.user_signup(user_data, deviceToken)

  const accessToken = result?.accessToken as string
  const refreshToken = result?.refreshToken as string
  const user_details = result?.user_details as Partial<User>

  // cookies options
  const options = {
    httpOnly: true,
    secure: false,
  }

  res.cookie('refreshToken', refreshToken, options)

  sendResponse<IUserLoginResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: { accessToken, user_details },
    message: 'User signed up successfully',
  })
})
// admin create
const adminCreate = catchAsync(async (req: Request, res: Response) => {
  const { ...user_data } = req.body
  const user = req.logged_in_user
  const result = await AuthServices.admin_create(user_data, user)

  const accessToken = result?.accessToken as string
  const refreshToken = result?.refreshToken as string
  const user_details = result?.user_details as Partial<User>

  // cookies options
  const options = {
    httpOnly: true,
    secure: false,
  }

  res.cookie('refreshToken', refreshToken, options)

  sendResponse<IUserLoginResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: { accessToken, user_details },
    message: 'Admin Created successfully',
  })
})

// login User
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password, deviceToken } = req.body
  const result = await AuthServices.user_login(email, password, deviceToken)

  const accessToken = result?.accessToken as string
  const refreshToken = result?.refreshToken as string
  const user_details = result?.user_details as Partial<User>

  // cookies options
  const options = {
    httpOnly: true,
    secure: false,
  }

  res.cookie('refreshToken', refreshToken, options)

  sendResponse<IUserLoginResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: { accessToken, user_details },
    message: 'User logged in successfully',
  })
})
// login User
const loginGoogleUser = catchAsync(async (req: Request, res: Response) => {
  const { email, username, avatar, googleId, deviceToken } = req.body
  const result = await AuthServices.user_google_login(
    email,
    username,
    avatar,
    googleId,
    deviceToken
  )

  const accessToken = result?.accessToken as string
  const refreshToken = result?.refreshToken as string
  const user_details = result?.user_details as Partial<User>

  // cookies options
  const options = {
    httpOnly: true,
    secure: false,
  }

  res.cookie('refreshToken', refreshToken, options)

  sendResponse<IUserLoginResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: { accessToken, user_details },
    message: 'User logged in successfully',
  })
})

//user profile create or update
const createOrUpdateUserDetails = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthServices.createOrUpdateUserDetails(req.body)

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'User details updated successfully',
    })
  }
)

// refreshToken
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.refresh_token(refreshToken)

  const accessToken = result?.accessToken as string
  const newRefreshToken = result?.refreshToken as string
  const user_details = result?.user_details as Partial<User>

  // cookies options
  const options = {
    httpOnly: true,
    secure: false,
  }

  res.cookie('refreshToken', newRefreshToken, options)

  sendResponse<IUserLoginResponse, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: { accessToken, user_details },
    message: 'New access token generated successfully !',
  })
})

export const AuthController = {
  signupUser,
  loginUser,
  adminCreate,
  createOrUpdateUserDetails,
  refreshToken,
  loginGoogleUser,
}
