import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { AccordianService } from './accordian.services'

// post productAccordian
const productAccordian = catchAsync(async (req: Request, res: Response) => {
  const { ...accordian_data } = req.body
  const user_data = req.logged_in_user
  // console.log('the user is', user_data, accordian_data)
  const result = await AccordianService.createProductAccordian(
    accordian_data,
    user_data
  )

  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Your accordian added successfully !',
  })
})

// get accordian product
const getProductAccordian = catchAsync(async (req: Request, res: Response) => {
  const result = await AccordianService.allproductAccordian()
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Your accordian retrieve successfully',
  })
})

const updateAccordian = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const user = req.logged_in_user
  const accordian_data = req.body
  const result = await AccordianService.updateAccordian(
    id,
    user,
    accordian_data
  )
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Accordian update successfully',
  })
})

const deleteAccordian = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const user = req.logged_in_user
  const result = await AccordianService.deleteAccordian(id, user)
  sendResponse(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Accordian delete successfully',
  })
})

export const AccordianController = {
  productAccordian,
  getProductAccordian,
  updateAccordian,
  deleteAccordian,
}
