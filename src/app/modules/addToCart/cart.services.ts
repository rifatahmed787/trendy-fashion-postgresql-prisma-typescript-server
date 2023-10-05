import { User } from '../user/user.model'
import { Types } from 'mongoose'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { IUser } from '../user/user.interface'
import { Book } from '../books/book.model'
import { ICart } from './cart.interface'
import { Cart } from './cart.model'

// Add in wish list
const ad_to_cart = async (cart_data: ICart): Promise<ICart | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    cart_data?.user_id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // book checking checking
  const isBookExist = await Book.findById(cart_data.book_id)

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  //  reading list cheking
  const isInCart = await Cart.findOne({
    book_id: cart_data?.book_id,
    user_id: cart_data?.user_id,
  })

  if (isInCart) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Already in your cart have this book '
    )
  }

  const created_cart = await Cart.create(cart_data)

  return created_cart
}

// Remove from wish list
const remove_from_cart = async (cart_data: ICart): Promise<ICart | null> => {
  // User checking
  const isUserExist: IUser | null = await User.isUserExistByID(
    cart_data?.user_id as Types.ObjectId
  )

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // book checking checking
  const isBookExist = await Book.findById(cart_data.book_id)

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
  }

  //  reading list cheking
  const isInRedingList = await Cart.findOne({
    book_id: cart_data?.book_id,
    user_id: cart_data?.user_id,
  })

  if (!isInRedingList) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Already removed from your wishlist'
    )
  }

  const remove_cart = await Cart.findByIdAndDelete(cart_data?._id)

  return remove_cart
}

// get_cart_by_id
const get_cart_by_user_id = async (
  user_id: string
): Promise<ICart[] | null> => {
  const user_cart = await Cart.find({ user_id: user_id })
    .populate('book_id')
    .populate('user_id')

  return user_cart
}

export const CartServices = {
  ad_to_cart,
  get_cart_by_user_id,
  remove_from_cart,
}
