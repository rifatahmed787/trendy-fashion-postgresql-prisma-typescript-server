import { z } from 'zod'

export const create_category_zod_schema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
  }),
})

export const update_category_zod_schema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
})

export const create_post_zod_schema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    content: z.string().nullable(),
    published: z.boolean().default(false),
    author_id: z.number({ required_error: 'Author ID is required' }),
    category_id: z.number({ required_error: 'Category ID is required' }),
  }),
})

export const update_post_zod_schema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().nullable().optional(),
    published: z.boolean().optional(),
    author_id: z.number().optional(),
    category_id: z.number().optional(),
  }),
})
