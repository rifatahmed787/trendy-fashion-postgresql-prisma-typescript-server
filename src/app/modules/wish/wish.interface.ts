import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'
import { IBook } from '../books/book.interface'

export type IWish = {
  _id?: Types.ObjectId
  book_id: Types.ObjectId | IBook
  user_id: Types.ObjectId | IUser
}

// Create a new Model type that knows about IUserMethods when available here...
export type WishModel = {
  isBookInUserWishList(book_id: string, user_id: string): Promise<boolean>
} & Model<IWish>
