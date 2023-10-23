import { CartProduct, PrismaClient } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

// Add in wish list
const add_to_cart = async (
  userId: number,
  productId: number
): Promise<CartProduct | null> => {
  // First, check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Now, check if the product (book) exists
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  // Check if the product is already in the user's cart
  const isInCart = await prisma.cartProduct.findFirst({
    where: {
      userId,
      productId,
    },
  })

  if (isInCart) {
    // Product is already in the cart, increment the quantity
    const updatedCart = await prisma.cartProduct.update({
      where: {
        id: isInCart.id,
      },
      data: {
        quantity: isInCart.quantity + 1,
      },
    })

    return updatedCart
  }

  // Product is not in the cart, create a new entry with quantity 1
  const createdCart = await prisma.cartProduct.create({
    data: {
      userId,
      productId,
      quantity: 1,
    },
  })

  return createdCart
}

// Remove from wish list
// const remove_from_cart = async (cart_data: ICart): Promise<ICart | null> => {
//   // User checking
//   const isUserExist: IUser | null = await User.isUserExistByID(
//     cart_data?.user_id as Types.ObjectId
//   )

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
//   }

//   // book checking checking
//   const isBookExist = await Book.findById(cart_data.book_id)

//   if (!isBookExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Book not found')
//   }

//   //  reading list cheking
//   const isInRedingList = await Cart.findOne({
//     book_id: cart_data?.book_id,
//     user_id: cart_data?.user_id,
//   })

//   if (!isInRedingList) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       'Already removed from your wishlist'
//     )
//   }

//   const remove_cart = await Cart.findByIdAndDelete(cart_data?._id)

//   return remove_cart
// }

// get_cart_by_id
// const get_cart_by_user_id = async (
//   user_id: string
// ): Promise<ICart[] | null> => {
//   const user_cart = await Cart.find({ user_id: user_id })
//     .populate('book_id')
//     .populate('user_id')

//   return user_cart
// }

export const CartServices = {
  add_to_cart,
}
