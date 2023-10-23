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

// get_cart_by_id
const get_cart_by_user_id = async (
  user_id: number
): Promise<CartProduct[] | null> => {
  const user_cart = await prisma.cartProduct.findMany({
    where: {
      userId: user_id,
    },
    include: {
      product: true,
    },
  })

  return user_cart
}

// Remove from wish list
const remove_from_cart = async (
  userId: number,
  id: number
): Promise<CartProduct | null> => {
  // Check if the product is in the user's cart
  const isInCartList = await prisma.cartProduct.findFirst({
    where: {
      userId,
      id,
    },
  })

  if (!isInCartList) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product is not in your cart')
  }

  if (isInCartList.quantity === 1) {
    // If the quantity is 1, remove the entire cart entry
    const removedCart = await prisma.cartProduct.delete({
      where: {
        id: isInCartList.id,
      },
    })

    return removedCart
  } else {
    // If the quantity is greater than 1, decrement the quantity by 1
    const updatedCart = await prisma.cartProduct.update({
      where: {
        id: isInCartList.id,
      },
      data: {
        quantity: isInCartList.quantity - 1,
      },
    })

    return updatedCart
  }
}

export const CartServices = {
  add_to_cart,
  get_cart_by_user_id,
  remove_from_cart,
}
