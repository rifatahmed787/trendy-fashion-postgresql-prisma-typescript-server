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
    message: 'users retrieved successfully',
  })
})

//  Get   user profile information
const userProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.my_profile(req.params.id)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: "User's information retrieved successfully",
  })
})

export const UserController = {
  userProfile,
  allUsers,
}
