import { z } from 'zod'

export const accordian_validation = z.object({
  body: z.object({
    question: z.string({ required_error: 'Question is required' }),
    answer: z.string({ required_error: 'Answer is required' }),
    category: z.string({ required_error: 'Category is required' }),
  }),
})
