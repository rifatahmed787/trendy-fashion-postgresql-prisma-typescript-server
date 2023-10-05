import { Model, Types } from 'mongoose'
import { IBook } from '../books/book.interface'
import { IUser } from '../user/user.interface'

export type ICart = {
  _id?: Types.ObjectId
  book_id: Types.ObjectId | IBook
  user_id: Types.ObjectId | IUser
}

// Create a new Model type that knows about IUserMethods when available here...
export type CartModel = {
  isBookInUserCart(book_id: string, user_id: string): Promise<boolean>
} & Model<ICart>
