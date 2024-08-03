import { z } from 'zod'

export const createAccordianCategorySchema = z.object({
  body: z.object({
    categoryName: z.string().min(1, { message: 'Category name is required' }),
  }),
})

export const updateAccordianCategorySchema = z.object({
  body: z.object({
    categoryName: z.string().min(1).optional(),
  }),
})
