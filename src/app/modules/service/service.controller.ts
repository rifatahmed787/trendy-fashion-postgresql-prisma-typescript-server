import httpStatus from 'http-status'
import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ServiceService } from './service.serivce'

// Create service
const createService = catchAsync(async (req: Request, res: Response) => {
  const { ...service_data } = req.body
  const user_data = req.logged_in_user
  const result = await ServiceService.create_service(service_data, user_data)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Service created successfully',
  })
})

const getService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getService()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Service retrieved successfully',
  })
})
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceService.getSingleService(id)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Single service retrieved successfully',
  })
})

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.logged_in_user
  const { ...service_data } = req.body
  const result = await ServiceService.update_service(id, service_data, user)

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Service updated successfully',
  })
})

export const ServiceController = {
  createService,
  getService,
  updateService,
  getSingleService,
}
