import { z } from 'zod'

export const wish_list_zod_schema = z.object({
  body: z.object({
    productId: z.number({ required_error: 'Product is required' }),
  }),
})
