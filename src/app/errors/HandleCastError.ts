import { Prisma, PrismaClient } from '@prisma/client'
import {
  generic_error_type,
  modified_error_res_type,
} from '../../interfaces/error'
import httpStatus from 'http-status'

export const handleCastError = async (
  err: Prisma.PrismaClientKnownRequestError
): Promise<modified_error_res_type> => {
  const targetPath =
    err?.meta && Array.isArray(err.meta.target)
      ? err.meta.target.join('.')
      : err?.meta?.target?.toString()

  const all_errors: generic_error_type[] = [
    {
      path: targetPath as string | number,
      message: 'Invalid id sent',
    },
  ]

  const prisma = new PrismaClient()

  try {
    if (err.code === 'P2002') {
      // Handle specific Prisma error
      return {
        status_code: httpStatus.FORBIDDEN,
        message: 'Cast error; Invalid id ',
        errorMessages: all_errors,
      }
    }
    // Handle other errors
    return {
      status_code: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      errorMessages: [{ message: 'An unexpected error occurred.' }],
    }
  } finally {
    await prisma.$disconnect()
  }
}
