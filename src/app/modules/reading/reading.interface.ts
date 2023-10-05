import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'
import { IBook } from '../books/book.interface'

export type IReading = {
  _id?: Types.ObjectId
  book_id: Types.ObjectId | IBook
  user_id: Types.ObjectId | IUser
}

// Create a new Model type that knows about IUserMethods when available here...
export type ReadingModel = {
  isBookInUserReadingList(
    book_id: string | Types.ObjectId,
    user_id: string | Types.ObjectId
  ): Promise<boolean>
} & Model<IReading>
