import { z } from 'zod'

export const createLatestSectionHeroSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    subTitle: z.string().min(1, { message: 'Subtitle is required' }),
    imgOne: z.string().url({ message: 'Image One must be a valid URL' }),
    imgTwo: z.string().url({ message: 'Image Two must be a valid URL' }),
  }),
})

export const updateLatestSectionHeroSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    subTitle: z.string().min(1, { message: 'Subtitle is required' }).optional(),
    imgOne: z
      .string()
      .url({ message: 'Image One must be a valid URL' })
      .optional(),
    imgTwo: z
      .string()
      .url({ message: 'Image Two must be a valid URL' })
      .optional(),
  }),
})
