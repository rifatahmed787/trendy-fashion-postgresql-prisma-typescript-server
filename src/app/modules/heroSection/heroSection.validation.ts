import { z } from 'zod'

export const createHeroSectionSchema = z.object({
  body: z.object({
    subTitle: z.string().min(1, { message: 'Subtitle is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
    paragraph: z.string().min(1, { message: 'Paragraph is required' }),
    img: z.string().url({ message: 'Image must be a valid URL' }),
  }),
})

export const updateHeroSectionSchema = z.object({
  body: z.object({
    subTitle: z.string().min(1, { message: 'Subtitle is required' }).optional(),
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    paragraph: z
      .string()
      .min(1, { message: 'Paragraph is required' })
      .optional(),
    img: z.string().url({ message: 'Image must be a valid URL' }).optional(),
  }),
})
