import { PrismaClient, PostLike } from '@prisma/client'
const prisma = new PrismaClient()

const postLike = async (
  like_data: Omit<PostLike, 'id'>,
  likerId: number
): Promise<PostLike | null> => {
  const { post_id } = like_data

  // Check if the like already exists
  const existingLike = await prisma.postLike.findUnique({
    where: {
      post_id_likerId: {
        post_id: post_id,
        likerId: likerId,
      },
    },
  })

  if (existingLike) {
    // If like exists, remove it (withdraw the like)
    await prisma.postLike.delete({
      where: {
        post_id_likerId: {
          post_id: post_id,
          likerId: likerId,
        },
      },
    })
    return null // Return null to indicate the like was withdrawn
  } else {
    // If like does not exist, create it (give the like)
    const newLike = await prisma.postLike.create({
      data: {
        post_id: post_id,
        likerId: likerId,
        like: 1, // Set the like value to 1
      },
    })
    return newLike // Return the new like
  }
}

export const LikeServices = {
  postLike,
}
