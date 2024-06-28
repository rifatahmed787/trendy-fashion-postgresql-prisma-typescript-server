import { z } from 'zod'

// Schema for creating a new like
export const like_post_zod_schema = z.object({
  body: z.object({
    like: z.number().optional().default(0),
    post_id: z.number({ required_error: 'Post ID is required' }),
    likerId: z.number({ required_error: 'Liker ID is required' }),
  }),
})

// Schema for editing a like
export const like_edit_zod_schema = z.object({
  body: z.object({
    like: z.number().optional(),
    post_id: z.number().optional(),
    likerId: z.number().optional(),
  }),
})
