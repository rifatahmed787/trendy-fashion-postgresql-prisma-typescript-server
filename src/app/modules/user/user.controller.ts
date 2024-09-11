import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { UserServices } from './user.services'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { pagination_keys } from '../../../constant/common'

//get all user
const allUsers = catchAsync(async (req: Request, res: Response) => {
  const pagination = pick(req.query, pagination_keys)
  const search = req.query.search?.toString() || ''
  const activeOnly = req.query.activeOnly === 'true'
  const result = await UserServices.allUsers(pagination, search, activeOnly)
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

const update_user_superadmin = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const user = req.logged_in_user
    const result = await UserServices.update_user_superadmin(id, user)

    sendResponse(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'User role updated successfully',
    })
  }
)

const update_user_admin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const result = await UserServices.update_user_admin(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User role updated successfully',
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const result = await UserServices.delete_user(id, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'User deleted successfully',
  })
})

export const UserController = {
  userProfile,
  allUsers,
  createAddress,
  updatedUser,
  update_user_superadmin,
  update_user_admin,
  deleteUser,
}
