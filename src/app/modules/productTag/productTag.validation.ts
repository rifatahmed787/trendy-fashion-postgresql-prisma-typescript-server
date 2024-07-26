import { z } from 'zod'

export const productTagSchema = z.object({
  body: z.object({
    tags: z.string().min(1, { message: 'Tag is required' }),
  }),
})
export const updateProductTagSchema = z.object({
  body: z.object({
    tags: z.string().min(1).optional(),
  }),
})
