import { Schema, Types, model } from 'mongoose'
import { CartModel, ICart } from './cart.interface'

// And a schema that knows about IUserMethods
const CartSchema = new Schema<ICart, CartModel>({
  book_id: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
})

//is book  Exist in cart
CartSchema.statics.isBookInUserCart = async function (
  book_id: string,
  user_id: string
): Promise<boolean> {
  const isExist = await Cart.findOne({
    book_id: new Types.ObjectId(book_id),
    user_id: new Types.ObjectId(user_id),
  })

  return isExist ? true : false
}

export const Cart = model<ICart, CartModel>('cart', CartSchema)
