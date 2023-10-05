import { Schema, Types, model } from 'mongoose'
import { IWish, WishModel } from './wish.interface'

// And a schema that knows about IUserMethods
const WishSchema = new Schema<IWish, WishModel>({
  book_id: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

//isPhone Number Exist
WishSchema.statics.isBookReviewedByUser = async function (
  book_id: string,
  user_id: string
): Promise<boolean> {
  const isExist = await Wish.findOne({
    book_id: new Types.ObjectId(book_id),
    user_id: new Types.ObjectId(user_id),
  })

  return isExist ? true : false
}

export const Wish = model<IWish, WishModel>('Wish', WishSchema)
