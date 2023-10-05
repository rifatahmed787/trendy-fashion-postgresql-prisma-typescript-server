import { Schema, Types, model } from 'mongoose'
import { IReading, ReadingModel } from './reading.interface'

// And a schema that knows about IUserMethods
const ReadingSchema = new Schema<IReading, ReadingModel>({
  book_id: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

//isPhone Number Exist
ReadingSchema.statics.isBookInUserReadingList = async function (
  book_id: string,
  user_id: string
): Promise<boolean> {
  const isExist = await Reading.findOne({
    book_id: new Types.ObjectId(book_id),
    user_id: new Types.ObjectId(user_id),
  })

  return isExist ? true : false
}

export const Reading = model<IReading, ReadingModel>('Reading', ReadingSchema)
