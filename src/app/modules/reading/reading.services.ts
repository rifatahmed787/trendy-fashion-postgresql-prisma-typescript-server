import { User } from '../user/user.model'
import { Types } from 'mongoose'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { IUser } from '../user/user.interface'
import { IReading } from './reading.interface'
import { Reading } from './reading.model'
import { Book } from '../books/book.model'

// Add in wish list
const ad_to_read = async (reading_data: IReading): Promise<IReading | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    reading_data?.user_id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // book checking checking
  const isBookExist = await Book.findById(reading_data.book_id)

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  //  reading list cheking
  const isInRedingList = await Reading.findOne({
    book_id: reading_data?.book_id,
    user_id: reading_data?.user_id,
  })

  if (isInRedingList) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Already in your study list have this book '
    )
  }

  const created_wish = await Reading.create(reading_data)

  return created_wish
}

const remove_from_reading_list = async (
  book_data: IReading
): Promise<IReading | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    book_data?.user_id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // book checking checking
  const isBookExist = await Book.findById(book_data.book_id)

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  //  reading list cheking
  const isInRedingList = await Reading.findOne({
    book_id: book_data?.book_id,
    user_id: book_data?.user_id,
  })

  if (!isInRedingList) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Already removed from your reading list'
    )
  }

  const removed_wish = await Reading.findByIdAndDelete(book_data?._id)

  return removed_wish
}

// get_reviews_by_id
const get_reading_list_by_user_id = async (
  user_id: string
): Promise<IReading[] | null> => {
  // // book checking checking
  // const isBookExist = await Book.isBookAvailable(bookID)

  // if (!isBookExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  // }

  const user_wish_list = await Reading.find({ user_id: user_id })
    .populate('book_id')
    .populate('user_id')

  return user_wish_list
}

export const ReadingServices = {
  ad_to_read,
  get_reading_list_by_user_id,
  remove_from_reading_list,
}
