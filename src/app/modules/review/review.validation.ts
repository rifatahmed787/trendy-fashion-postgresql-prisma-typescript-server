import { z } from 'zod'

export const review_post_zod_schema = z.object({
  body: z.object({
    rating: z.number({ required_error: 'Rating is required' }),
    reviewText: z.string({ required_error: 'Review is required' }),
  }),
})
export const review_edit_zod_schema = z.object({
  body: z.object({
    rating: z.number({ required_error: 'Rating is required' }).optional(),
    reviewText: z.string({ required_error: 'Review is required' }).optional(),
  }),
})
