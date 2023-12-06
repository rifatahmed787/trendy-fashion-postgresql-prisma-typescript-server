import { z } from 'zod'

export const cart_zod_schema = z.object({
  body: z.object({
    productId: z.number({ required_error: 'Product is required' }),
  }),
})
