import { z } from 'zod'

export const productSizeSchema = z.object({
  body: z.object({
    size: z.string().min(1, { message: 'Size is required' }),
  }),
})
export const updateProductSizeSchema = z.object({
  body: z.object({
    size: z.string().min(1).optional(),
  }),
})
