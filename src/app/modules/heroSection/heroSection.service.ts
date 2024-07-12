import { HeroSection, PrismaClient, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const create_hero_section = async (
  hero_data: HeroSection,
  user: JwtPayload
): Promise<HeroSection | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can create hero')
  }

  const createHero = await prisma.heroSection.create({
    data: hero_data,
  })
  return createHero
}

const getHero = async (): Promise<HeroSection[]> => {
  const getData = await prisma.heroSection.findMany()
  return getData
}

const update_hero = async (
  id: string,
  hero_data: Partial<HeroSection>,
  user: JwtPayload
): Promise<HeroSection | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update hero'
    )
  }

  const existingHeroId = parseInt(id)
  const existingHero = await prisma.heroSection.findUnique({
    where: {
      id: existingHeroId,
    },
  })

  if (!existingHero) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Hero not found')
  }

  // Now, update the Hero hero
  const updateHeroId = parseInt(id)
  const updated_Hero_data = await prisma.heroSection.update({
    where: {
      id: updateHeroId,
    },
    data: hero_data,
  })

  return updated_Hero_data
}

export const HeroSectionService = {
  create_hero_section,
  getHero,
  update_hero,
}
