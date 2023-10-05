import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { IReading } from './reading.interface'
import { ReadingServices } from './reading.services'

// post review]
const addToRead = catchAsync(async (req: Request, res: Response) => {
  const { ...wread_data } = req.body
  const result = await ReadingServices.ad_to_read(wread_data)

  sendResponse<IReading, null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message:
      'Book added in in reading list successfully ! , check your reading list',
  })
})

// delete from review
const removeFromReadingList = catchAsync(
  async (req: Request, res: Response) => {
    const { ...wish_data } = req.body
    const result = await ReadingServices.remove_from_reading_list(wish_data)

    sendResponse<IReading, null>(res, {
      status_code: httpStatus.OK,
      success: true,
      data: result,
      message: 'Book removed from your reading list successfully !',
    })
  }
)

// getBookReviews
const getReadingList = catchAsync(async (req: Request, res: Response) => {
  const result = await ReadingServices.get_reading_list_by_user_id(
    req.logged_in_user?._id as string
  )

  sendResponse<IReading[], null>(res, {
    status_code: httpStatus.OK,
    success: true,
    data: result,
    message: 'Reading list ',
  })
})

export const ReadingController = {
  addToRead,
  getReadingList,
  removeFromReadingList,
}
