import { Prisma } from '@prisma/client'
import {
  generic_error_type,
  modified_error_res_type,
} from '../../interfaces/error'

export const handleValidationError = (
  err: Prisma.PrismaClientValidationError
): modified_error_res_type => {
  const all_errors: generic_error_type[] = Array.isArray(err.message)
    ? err.message.map((el: { path: string; message: string }) => {
        return { path: el.path, message: el.message }
      })
    : []

  return {
    status_code: 400,
    message: 'Validation Error; Some values are missing or incorrect',
    errorMessages: all_errors,
  }
}
