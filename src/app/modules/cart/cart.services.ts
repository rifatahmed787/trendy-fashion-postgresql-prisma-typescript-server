import { CartProduct, PrismaClient, Role } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { pushNotification } from '../../../helpers/pushNotification'
import { JwtPayload } from 'jsonwebtoken'

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

  // Now, check if the product exists
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  const product_quantity = await prisma.products.findFirst({
    where: {
      id: productId,
      quantity: {
        equals: 0,
      },
    },
  })

  if (product_quantity) {
    throw new Error('This product is out of Stock')
  }

  // Check if the product is already in the user's cart
  const isInCart = await prisma.cartProduct.findFirst({
    where: {
      userId,
      productId,
      orderStatus: false,
    },
  })

  if (isInCart) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'Product is already in cart, update quantity from cart'
    )
  }

  // Product is not in the cart, create a new entry with quantity 1
  const createdCart = await prisma.cartProduct.create({
    data: {
      userId,
      productId,
      quantity: 1,
      totalPrice: product.productPrice,
    },
    include: {
      user: true,
      product: true,
    },
  })

  const tokens = await prisma.deviceToken.findMany()
  if (tokens.length) {
    for (const token of tokens) {
      await pushNotification(token.deviceToken, JSON.stringify(createdCart))
    }
  }

  return createdCart
}

// get all the cart
const getCart = async (user: JwtPayload): Promise<CartProduct[] | null> => {
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create products'
    )
  }
  const getCart = await prisma.cartProduct.findMany({
    include: {
      product: true,
      user: true,
    },
  })
  return getCart
}

const acceptCart = async (
  user: JwtPayload,
  id: number
): Promise<CartProduct | null> => {
  if (user?.role === Role.ADMIN) {
    const cartProduct = await prisma.cartProduct.update({
      where: {
        id: id,
      },
      data: {
        status: 'Accepted',
      },
    })

    return cartProduct
  }
  return null
}
const rejectCart = async (
  user: JwtPayload,
  id: number
): Promise<CartProduct | null> => {
  if (user?.role === Role.ADMIN) {
    const cartProduct = await prisma.cartProduct.update({
      where: {
        id: id,
      },
      data: {
        status: 'Rejected',
      },
    })

    return cartProduct
  }
  return null
}

// get_cart_by_id
const get_cart_by_user_id = async (
  user_id: number
): Promise<CartProduct[] | null> => {
  const user_cart = await prisma.cartProduct.findMany({
    where: {
      userId: user_id,
      orderStatus: false,
    },
    include: {
      product: true,
    },
  })

  return user_cart
}

// cartService.ts
const update_quantity = async (
  userId: number,
  id: string,
  quantity: number
): Promise<CartProduct | null> => {
  // Find the cart entry

  const existingCartId = parseInt(id)
  const existingCartProduct = await prisma.cartProduct.findFirst({
    where: {
      userId,
      id: existingCartId,
    },
    include: {
      product: true,
    },
  })

  if (!existingCartProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cart entry not found')
  }

  // Update quantity and total price
  const updatedCart = await prisma.cartProduct.update({
    where: {
      id: existingCartProduct.id,
    },
    data: {
      quantity,
      totalPrice: existingCartProduct.product.productPrice * quantity,
    },
  })

  return updatedCart
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

const clear_cart = async (userId: number): Promise<CartProduct[] | null> => {
  const deletedCartProducts = await prisma.cartProduct.findMany({
    where: {
      userId,
    },
  })
  // Check if the product is in the user's cart
  if (deletedCartProducts.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Your cart is already empty')
  }

  // Delete all cart products for the specified user
  await prisma.cartProduct.deleteMany({
    where: {
      userId,
      orderStatus: false,
    },
  })

  return deletedCartProducts
}

export const CartServices = {
  add_to_cart,
  get_cart_by_user_id,
  remove_from_cart,
  update_quantity,
  clear_cart,
  getCart,
  acceptCart,
  rejectCart,
}
