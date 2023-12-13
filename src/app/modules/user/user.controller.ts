import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { UserServices } from './user.services'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

//get all user
const allUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.allUsers()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Users retrieved successfully',
  })
})

//  Get   user profile information
const userProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.logged_in_user?.id
  const result = await UserServices.my_profile(userId)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: "User's information retrieved successfully",
  })
})

const createAddress = catchAsync(async (req: Request, res: Response) => {
  const { ...address_data } = req.body
  const userId = req.logged_in_user?.id

  const result = await UserServices.createAddress(userId, address_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Address updated successfully!',
  })
})

const updatedUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user_data } = req.body
  const userId = req.logged_in_user?.id
  const result = await UserServices.updateUser(userId, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User updated successfully',
  })
})

export const UserController = {
  userProfile,
  allUsers,
  createAddress,
  updatedUser,
}
