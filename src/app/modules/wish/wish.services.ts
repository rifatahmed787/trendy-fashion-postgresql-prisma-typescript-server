/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, WishList } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const addToWish = async (
  userId: number,
  productId: number
): Promise<WishList | null> => {
  // User checking
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Product checking
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  // Check if the product is already in the wish list
  const isInWishList = await prisma.wishList.findFirst({
    where: {
      userId,
      productId,
    },
  })

  if (isInWishList) {
    throw new ApiError(httpStatus.FOUND, 'Product is already in your wish list')
  }

  // Create a new wish list entry
  const createdWish = await prisma.wishList.create({
    data: {
      userId,
      productId,
    },
  })

  return createdWish
}

// Remove from wish list
const removeFromWish = async (
  userId: number,
  id: number
): Promise<WishList | null> => {
  // User checking
  // const user = await prisma.wishList.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // })

  // if (!user) {
  //   throw new Error('User not found')
  // }

  // Product checking
  // const product = await prisma.wishList.findUnique({
  //   where: {
  //     id: id,
  //   },
  // })

  // if (!product) {
  //   throw new Error('Product not found')
  // }

  // Check if the product is in the user's wish list
  const isInWishList = await prisma.wishList.findFirst({
    where: {
      userId,
      productId: id,
    },
  })

  if (!isInWishList) {
    throw new Error('Product is already removed from your wish list')
  }

  // First, get the ID of the wish list entry to be deleted
  const wishListId = isInWishList.id

  // Delete the product from the wish list using the wishListId
  const removedWish = await prisma.wishList.delete({
    where: {
      id: wishListId,
    },
  })

  return removedWish
}

const getWishListByUserId = async (userId: number): Promise<WishList[]> => {
  // Retrieve the wish list entries for the user by their ID
  const userWishList = await prisma.wishList.findMany({
    where: {
      userId: userId,
    },
    include: {
      product: true,
    },
  })

  return userWishList
}

export const WishServices = {
  addToWish,
  getWishListByUserId,
  removeFromWish,
}
