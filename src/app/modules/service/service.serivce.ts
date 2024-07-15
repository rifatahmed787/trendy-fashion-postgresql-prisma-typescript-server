import { PrismaClient, Role, service } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const create_service = async (
  service_data: service,
  user: JwtPayload
): Promise<service | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create service'
    )
  }

  const createService = await prisma.service.create({
    data: service_data,
  })
  return createService
}

const getService = async (): Promise<service[]> => {
  const getData = await prisma.service.findMany()
  return getData
}

const getSingleService = async (id: string): Promise<service | null> => {
  const serviceId = parseInt(id)
  const serviceDetails = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  })
  if (!serviceDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')
  }

  return serviceDetails
}

const update_service = async (
  id: string,
  service_data: Partial<service>,
  user: JwtPayload
): Promise<service | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update service'
    )
  }

  const existingServiceId = parseInt(id)
  const existingService = await prisma.service.findUnique({
    where: {
      id: existingServiceId,
    },
  })

  if (!existingService) {
    throw new ApiError(httpStatus.NOT_FOUND, 'service not found')
  }

  // Now, update the service
  const updateServiceId = parseInt(id)
  const updated_service_data = await prisma.service.update({
    where: {
      id: updateServiceId,
    },
    data: service_data,
  })

  return updated_service_data
}

export const ServiceService = {
  create_service,
  getService,
  update_service,
  getSingleService,
}
