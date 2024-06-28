import { PostComment, PrismaClient, Role } from '@prisma/client'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'

const prisma = new PrismaClient()

// Create new comment
const post_comment = async (
  comment_data: PostComment,
  commenterId: number
): Promise<PostComment | null> => {
  // First, check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: commenterId,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  // Now, check if the post exists
  const post = await prisma.post.findUnique({
    where: {
      id: comment_data.commenterId,
    },
  })

  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }

  // Create a new comment entry
  const createdComment = await prisma.postComment.create({
    data: comment_data,
  })

  return createdComment
}

// Update comment
const update_comment = async (
  id: string,
  comment_data: Partial<PostComment>,
  user: JwtPayload
): Promise<PostComment | null> => {
  const existingCommentId = parseInt(id)
  const existingComment = await prisma.postComment.findUnique({
    where: {
      id: existingCommentId,
    },
  })

  if (!existingComment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
  }

  // Check if the user is the author of the coment
  if (existingComment.commenterId !== user.id) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update this comment'
    )
  }

  // Now, update the comment
  const updateCommentId = parseInt(id)
  const updated_comment_data = await prisma.postComment.update({
    where: {
      id: updateCommentId,
    },
    data: comment_data,
  })

  return updated_comment_data
}

//  Delete comment
const delete_comment = async (
  id: string,
  user: JwtPayload
): Promise<PostComment | null> => {
  const commentId = parseInt(id)

  // Check if the comment exists
  const comment = await prisma.postComment.findUnique({
    where: {
      id: commentId,
    },
  })

  if (!comment) {
    throw new ApiError(
      httpStatus.EXPECTATION_FAILED,
      'Failed to delete comment'
    )
  }

  // Check if the user is an admin
  if (
    comment.commenterId === user?.id ||
    user?.role !== Role.ADMIN ||
    Role.SUPERADMIN
  ) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only author users can delete comment'
    )
  }

  // Delete the comment
  const deletedComment = await prisma.postComment.delete({
    where: {
      id: commentId,
    },
  })

  return deletedComment
}

export const CommentServices = {
  post_comment,
  update_comment,
  delete_comment,
}
