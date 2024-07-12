import { z } from 'zod'

export const createDealSectionSchema = z.object({
  body: z.object({
    campaign: z.string().min(1, { message: 'Campaign is required' }),
    shipping: z.string().min(1, { message: 'Shipping is required' }),
    smImgOne: z
      .string()
      .url({ message: 'Small Image One must be a valid URL' }),
    smImgTwo: z
      .string()
      .url({ message: 'Small Image Two must be a valid URL' }),
    lgImg: z.string().url({ message: 'Large Image must be a valid URL' }),
  }),
})

export const updateDealSectionSchema = z.object({
  body: z.object({
    campaign: z.string().min(1, { message: 'Campaign is required' }).optional(),
    shipping: z.string().min(1, { message: 'Shipping is required' }).optional(),
    smImgOne: z
      .string()
      .url({ message: 'Small Image One must be a valid URL' })
      .optional(),
    smImgTwo: z
      .string()
      .url({ message: 'Small Image Two must be a valid URL' })
      .optional(),
    lgImg: z
      .string()
      .url({ message: 'Large Image must be a valid URL' })
      .optional(),
  }),
})
