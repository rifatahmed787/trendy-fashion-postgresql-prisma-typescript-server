import { z } from 'zod'

export const cart_zod_schema = z.object({
  body: z.object({
    productId: z.number({ required_error: 'Product is required' }),
    userId: z.number({ required_error: 'User is required' }),
    totalPrice: z.number({ required_error: 'Total price is required' }),
    productSize: z.array(
      z.string().min(1, { message: 'Size colors is required' })
    ),
    productColor: z.array(
      z.string().min(1, { message: 'Size colors is required' })
    ),
    deliveryTime: z.string().min(1, { message: 'Delivery time is required' }),
    paymentType: z.string().min(1, { message: 'Delivery time is required' }),
  }),
})
export const update_cart_zod_schema = z.object({
  body: z.object({
    productId: z.number({ required_error: 'Product is required' }).optional(),
    userId: z.number({ required_error: 'User is required' }).optional(),
    totalPrice: z
      .number({ required_error: 'Total price is required' })
      .optional(),
    productSize: z.array(
      z.string().min(1, { message: 'Size colors is required' }).optional()
    ),
    productColor: z.array(
      z.string().min(1, { message: 'Size colors is required' }).optional()
    ),
    deliveryTime: z
      .string()
      .min(1, { message: 'Delivery time is required' })
      .optional(),
    paymentType: z
      .string()
      .min(1, { message: 'Delivery time is required' })
      .optional(),
  }),
})
