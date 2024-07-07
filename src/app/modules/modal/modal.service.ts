import { ModalImg, PrismaClient, Role } from '@prisma/client'
import { JwtPayload } from 'jsonwebtoken'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const prisma = new PrismaClient()

const create_modal = async (
  modal_data: ModalImg,
  user: JwtPayload
): Promise<ModalImg | null> => {
  // Check if the user is an admin
  if (user?.role !== Role.ADMIN) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Only admin users can create modal'
    )
  }

  const createModal = await prisma.modalImg.create({
    data: modal_data,
  })
  return createModal
}

const getModal = async (): Promise<ModalImg[]> => {
  const getData = await prisma.modalImg.findMany()
  return getData
}

const update_modal = async (
  id: string,
  modal_data: Partial<ModalImg>,
  user: JwtPayload
): Promise<ModalImg | null> => {
  // Check if the user is an admin or has the necessary permissions
  if (user.role !== 'ADMIN') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'You do not have permission to update modal'
    )
  }

  const existingModalId = parseInt(id)
  const existingModal = await prisma.modalImg.findUnique({
    where: {
      id: existingModalId,
    },
  })

  if (!existingModal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'modal not found')
  }

  // Now, update the modal
  const updateModalId = parseInt(id)
  const updated_modal_data = await prisma.modalImg.update({
    where: {
      id: updateModalId,
    },
    data: modal_data,
  })

  return updated_modal_data
}

export const ModalService = {
  create_modal,
  getModal,
  update_modal,
}
