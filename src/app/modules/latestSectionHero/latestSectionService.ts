import { latestSectionHero, PrismaClient, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const create_latest_hero = async (
  latest_hero_data: latestSectionHero,
  user: JwtPayload
): Promise<latestSectionHero | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create latest hero'
    )
  }

  const createLatestHero = await prisma.latestSectionHero.create({
    data: latest_hero_data,
  })
  return createLatestHero
}

const getLatestHero = async (): Promise<latestSectionHero[]> => {
  const getData = await prisma.latestSectionHero.findMany()
  return getData
}

const update_latest_hero = async (
  id: string,
  latest_hero_data: Partial<latestSectionHero>,
  user: JwtPayload
): Promise<latestSectionHero | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update latest hero'
    )
  }

  const existingLatestId = parseInt(id)
  const existingLatest = await prisma.latestSectionHero.findUnique({
    where: {
      id: existingLatestId,
    },
  })

  if (!existingLatest) {
    throw new ApiError(httpStatus.NOT_FOUND, 'latest hero not found')
  }

  // Now, update the latest hero
  const updateLatestId = parseInt(id)
  const updated_latest_data = await prisma.latestSectionHero.update({
    where: {
      id: updateLatestId,
    },
    data: latest_hero_data,
  })

  return updated_latest_data
}

export const LatestHeroService = {
  create_latest_hero,
  getLatestHero,
  update_latest_hero,
}
