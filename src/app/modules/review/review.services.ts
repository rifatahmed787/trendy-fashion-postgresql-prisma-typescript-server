import { PrismaClient, ProductReview } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

// Create new review
const post_review = async (
  review_data: ProductReview,
  reviewerId: number
): Promise<ProductReview | null> => {
  // First, check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: reviewerId,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Now, check if the product exists
  const product = await prisma.products.findUnique({
    where: {
      id: review_data.productId,
    },
  })

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  // Create a new review entry
  const createdReview = await prisma.productReview.create({
    data: {
      reviewerId,
      productId: review_data.productId,
      rating: review_data.rating,
      reviewText: review_data.reviewText,
    },
  })

  return createdReview
}

// get_reviews_by_id

export const ReviewServices = {
  post_review,
}
