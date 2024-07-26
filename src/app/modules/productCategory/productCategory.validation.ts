import { z } from 'zod'

export const createProductCategorySchema = z.object({
  body: z.object({
    categoryName: z.string().min(1, { message: 'Category name is required' }),
  }),
})

export const updateProductCategorySchema = z.object({
  body: z.object({
    categoryName: z.string().min(1).optional(),
  }),
})
