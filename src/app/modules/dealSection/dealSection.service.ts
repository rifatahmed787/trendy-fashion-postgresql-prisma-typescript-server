import { dealSection, PrismaClient, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const create_deal = async (
  deal_data: dealSection,
  user: JwtPayload
): Promise<dealSection | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Only admin users can create deal')
  }

  const createDeal = await prisma.dealSection.create({
    data: deal_data,
  })
  return createDeal
}

const getDeal = async (): Promise<dealSection[]> => {
  const getData = await prisma.dealSection.findMany()
  return getData
}

const update_deal = async (
  id: string,
  deal_data: Partial<dealSection>,
  user: JwtPayload
): Promise<dealSection | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update deal'
    )
  }

  const existingDealId = parseInt(id)
  const existingDeal = await prisma.dealSection.findUnique({
    where: {
      id: existingDealId,
    },
  })

  if (!existingDeal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Deal hero not found')
  }

  // Now, update the Deal hero
  const updateDealId = parseInt(id)
  const updated_Deal_data = await prisma.dealSection.update({
    where: {
      id: updateDealId,
    },
    data: deal_data,
  })

  return updated_Deal_data
}

export const DealService = {
  create_deal,
  getDeal,
  update_deal,
}
