import { z } from 'zod'

export const create_accordian_validation = z.object({
  body: z.object({
    question: z.string({ required_error: 'Question is required' }),
    answer: z.string({ required_error: 'Answer is required' }),
    category_id: z.number({ required_error: 'Category id is required' }),
  }),
})
export const update_accordian_validation = z.object({
  body: z.object({
    question: z.string().optional(),
    answer: z.string().optional(),
    category_id: z.string().optional(),
  }),
})
