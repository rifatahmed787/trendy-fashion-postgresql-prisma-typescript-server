import { z } from 'zod'

export const productTypeSchema = z.object({
  body: z.object({
    typeName: z.string().min(1, { message: 'Type is required' }),
  }),
})
export const updateProductTypeSchema = z.object({
  body: z.object({
    typeName: z.string().min(1).optional(),
  }),
})
