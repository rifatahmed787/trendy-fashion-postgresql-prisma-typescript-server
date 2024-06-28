import { z } from 'zod'

// Schema for creating a new comment
export const comment_post_zod_schema = z.object({
  body: z.object({
    comment: z.string({ required_error: 'Comment is required' }),
    post_id: z.number({ required_error: 'Post ID is required' }),
    commenterId: z.number({ required_error: 'Commenter ID is required' }),
  }),
})

// Schema for editing a comment
export const comment_edit_zod_schema = z.object({
  body: z.object({
    comment: z.string({ required_error: 'Comment is required' }).optional(),
    post_id: z.number({ required_error: 'Post ID is required' }).optional(),
    commenterId: z
      .number({ required_error: 'Commenter ID is required' })
      .optional(),
  }),
})
