import { z } from 'zod'

export const productColorSchema = z.object({
  body: z.object({
    color: z.string().min(1, { message: 'Color is required' }),
  }),
})
export const updateProductColorSchema = z.object({
  body: z.object({
    color: z.string().min(1).optional(),
  }),
})
