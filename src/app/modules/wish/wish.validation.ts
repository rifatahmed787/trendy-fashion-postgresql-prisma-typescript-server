import { z } from 'zod'

export const wish_list_zod_schema = z.object({
  body: z.object({
    cloth_id: z.string({ required_error: 'Product is required' }),
  }),
})
