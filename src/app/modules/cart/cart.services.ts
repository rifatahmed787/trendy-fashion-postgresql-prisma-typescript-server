import { CartProduct, PrismaClient, Role } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { pushNotification } from '../../../helpers/pushNotification'
import { JwtPayload } from 'jsonwebtoken'
import { pagination_map } from '../../../helpers/pagination'
import { IPagination } from '../../../interfaces/pagination'
import { filter_product_conditions } from '../products/product.condition'
import { IProductFilter } from '../products/product.interface'
import { GenericResponse } from '../../../interfaces/common'

const prisma = new PrismaClient()

// Add in wish list
const add_to_cart = async (
  userId: number,
  cart_data: CartProduct
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
      id: cart_data.productId,
    },
  })

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  const product_quantity = await prisma.products.findFirst({
    where: {
      id: cart_data.productId,
      productQuantity: {
        equals: 0,
      },
      stockOut: true,
    },
  })

  if (product_quantity) {
    throw new Error('This product is out of Stock')
  }

  // Check if the product is already in the user's cart
  const isInCart = await prisma.cartProduct.findFirst({
    where: {
      userId,
      productId: cart_data.productId,
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
      productId: cart_data.productId,
      productSize: cart_data.productSize,
      productColor: cart_data.productColor,
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
const getCart = async (
  user: JwtPayload,
  filters: IProductFilter,
  pagination_data: Partial<IPagination>
): Promise<GenericResponse<CartProduct[] | null>> => {
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can get the cart'
    )
  }
  const { page, limit, skip, sortObject } = pagination_map(pagination_data)
  // Define conditions (for search and filter)
  const filterConditions = filter_product_conditions(filters) ?? {}
  const getCart = await prisma.cartProduct.findMany({
    where: filterConditions,
    orderBy: sortObject,
    skip: skip,
    take: limit,
    include: {
      product: true,
      user: true,
    },
  })

  const total = await prisma.products.count({
    where: filterConditions,
  })

  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: getCart,
  }
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

    const product = await prisma.products.findUnique({
      where: {
        id: cartProduct.productId,
      },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    if (cartProduct.status === 'Accepted') {
      const updatedQuantity = product.productQuantity - cartProduct.quantity
      await prisma.products.update({
        where: {
          id: product.id,
        },
        data: {
          productQuantity: updatedQuantity,
          stockOut: updatedQuantity === 0,
        },
      })
    }

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
const onGoingProduct = async (
  user: JwtPayload,
  id: number
): Promise<CartProduct | null> => {
  if (user?.role === Role.ADMIN) {
    const cartProduct = await prisma.cartProduct.update({
      where: {
        id: id,
      },
      data: {
        shipping: 'ONGOING',
      },
    })

    return cartProduct
  }
  return null
}
const shippingDone = async (
  user: JwtPayload,
  id: number
): Promise<CartProduct | null> => {
  if (user?.role === Role.ADMIN) {
    const cartProduct = await prisma.cartProduct.update({
      where: {
        id: id,
      },
      data: {
        shipping: 'DONE',
      },
    })

    return cartProduct
  }
  return null
}

const returnProduct = async (
  user: JwtPayload,
  id: number
): Promise<CartProduct | null> => {
  if (user?.role === Role.ADMIN) {
    const cartProduct = await prisma.cartProduct.update({
      where: {
        id: id,
      },
      data: {
        shipping: 'RETURN',
      },
    })

    const product = await prisma.products.findUnique({
      where: {
        id: cartProduct.productId,
      },
    })

    if (!product) {
      throw new Error('Product not found')
    }

    if (cartProduct.shipping === 'RETURN') {
      const updatedQuantity = product.productQuantity + cartProduct.quantity
      await prisma.products.update({
        where: {
          id: product.id,
        },
        data: {
          productQuantity: updatedQuantity,
          stockOut: updatedQuantity === 0,
        },
      })
    }

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
      user: true,
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

const update_color = async (
  userId: number,
  id: string,
  data: CartProduct
): Promise<CartProduct | null> => {
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

  // Update color
  const updatedColor = await prisma.cartProduct.update({
    where: {
      id: existingCartProduct.id,
    },
    data: {
      productColor: data.productColor,
    },
  })
  return updatedColor
}
const update_size = async (
  userId: number,
  id: string,
  data: CartProduct
): Promise<CartProduct | null> => {
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

  // Update size
  const updatedSize = await prisma.cartProduct.update({
    where: {
      id: existingCartProduct.id,
    },
    data: {
      productSize: data.productSize,
    },
  })
  return updatedSize
}

const createOrder = async (
  userId: number,
  data: CartProduct[]
): Promise<CartProduct[] | null> => {
  const updatedOrder: CartProduct[] = []

  for (const cart of data) {
    const existingCartProduct = await prisma.cartProduct.findFirst({
      where: {
        userId,
        id: cart?.id,
      },
      include: {
        product: true,
      },
    })

    if (!existingCartProduct) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Cart entry not found')
    }

    // Update order status
    const updatedProduct = await prisma.cartProduct.update({
      where: {
        id: cart?.id,
      },
      data: {
        orderStatus: true,
      },
    })

    updatedOrder.push(updatedProduct)
  }

  return updatedOrder.length > 0 ? updatedOrder : null
}

export const CartServices = {
  add_to_cart,
  get_cart_by_user_id,
  remove_from_cart,
  update_quantity,
  update_color,
  update_size,
  createOrder,
  clear_cart,
  getCart,
  acceptCart,
  rejectCart,
  onGoingProduct,
  shippingDone,
  returnProduct,
}
