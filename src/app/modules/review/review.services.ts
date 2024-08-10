import { PrismaClient, ProductReview } from '@prisma/client'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'

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

// Update review
const update_review = async (
  id: string,
  review_data: Partial<ProductReview>,
  user: JwtPayload
): Promise<ProductReview | null> => {
  const existingReviewId = parseInt(id)
  const existingReview = await prisma.productReview.findUnique({
    where: {
      id: existingReviewId,
    },
  })

  if (!existingReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found')
  }

  // Check if the user is the author of the review
  if (existingReview.reviewerId !== user.id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update this review'
    )
  }

  // Now, update the review
  const updateReviewId = parseInt(id)
  const updated_review_data = await prisma.productReview.update({
    where: {
      id: updateReviewId,
    },
    data: review_data,
  })

  return updated_review_data
}

//  Delete review
const delete_review = async (
  id: string,
  user: JwtPayload
): Promise<ProductReview | null> => {
  const reviewId = parseInt(id)

  // Check if the review exists
  const review = await prisma.productReview.findUnique({
    where: {
      id: reviewId,
    },
  })

  if (!review) {
    throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to delete review')
  }

  // Check if the user is an author
  if (review.reviewerId !== user?.id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only author users can delete review'
    )
  }

  // Delete the review
  const deletedReview = await prisma.productReview.delete({
    where: {
      id: reviewId,
    },
  })

  return deletedReview
}

export const ReviewServices = {
  post_review,
  update_review,
  delete_review,
}
