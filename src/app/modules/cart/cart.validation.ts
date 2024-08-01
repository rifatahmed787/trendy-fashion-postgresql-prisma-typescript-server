import { z } from 'zod'

export const cart_zod_schema = z.object({
  body: z.object({
    productId: z.number({ required_error: 'Product is required' }),
    userId: z.number({ required_error: 'User is required' }),
  }),
})
export const update_cart_zod_schema = z.object({
  body: z.object({
    productId: z.number({ required_error: 'Product is required' }).optional(),
    userId: z.number({ required_error: 'User is required' }).optional(),
  }),
})
