import { User } from '../user/user.model'
import { Types } from 'mongoose'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { IUser } from '../user/user.interface'
import { Book } from '../books/book.model'
import { IWish } from './wish.interface'
import { Wish } from './wish.model'

// Add in wish list
const ad_to_wish = async (wish_data: IWish): Promise<IWish | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    wish_data?.user_id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // book checking checking
  const isBookExist = await Book.findById(wish_data.book_id)

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  //  reading list cheking
  const isInWishList = await Wish.findOne({
    book_id: wish_data?.book_id,
    user_id: wish_data?.user_id,
  })

  if (isInWishList) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Already in your wish list have this book '
    )
  }

  const created_wish = await Wish.create(wish_data)

  return created_wish
}

// Remove from wish list
const remove_from_wish = async (wish_data: IWish): Promise<IWish | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    wish_data?.user_id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // book checking checking
  const isBookExist = await Book.findById(wish_data.book_id)

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  //  reading list cheking
  const isInWishList = await Wish.findOne({
    book_id: wish_data?.book_id,
    user_id: wish_data?.user_id,
  })

  if (!isInWishList) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Already removed from your wishlist'
    )
  }

  const remove_wish = await Wish.findByIdAndDelete(wish_data?._id)

  return remove_wish
}

// get_reviews_by_id
const get_wish_list_by_user_id = async (
  user_id: string
): Promise<IWish[] | null> => {
  // // book checking checking
  // const isBookExist = await Book.isBookAvailable(bookID)

  // if (!isBookExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  // }

  const user_wish_list = await Wish.find({ user_id: user_id })
    .populate('book_id')
    .populate('user_id')

  return user_wish_list
}

export const WishServices = {
  ad_to_wish,
  get_wish_list_by_user_id,
  remove_from_wish,
}
