import { z } from 'zod'

export const createSliderHeroSchema = z.object({
  body: z
    .object({
      title: z.string().min(1, { message: 'Title is required' }),
      subTitle: z.string().min(1, { message: 'Subtitle is required' }),
      lgImg: z.string().url({ message: 'Image must be a valid URL' }),
      smImg: z.string().url({ message: 'Image must be a valid URL' }),
      startDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Start Date must be a valid DateTime',
      }),
      endDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'End Date must be a valid DateTime',
      }),
    })
    .refine(
      data => {
        const startDate = new Date(data.startDate)
        const endDate = new Date(data.endDate)
        return endDate > startDate
      },
      {
        message: 'End Date must be after Start Date',
        path: ['endDate'],
      }
    ),
})

export const updateSliderHeroSchema = z.object({
  body: z
    .object({
      title: z.string().min(1, { message: 'Title is required' }).optional(),
      subTitle: z
        .string()
        .min(1, { message: 'Subtitle is required' })
        .optional(),
      lgImg: z
        .string()
        .url({ message: 'Image must be a valid URL' })
        .optional(),
      smImg: z
        .string()
        .url({ message: 'Image must be a valid URL' })
        .optional(),
      startDate: z
        .string()
        .refine(val => !isNaN(Date.parse(val)), {
          message: 'Start Date must be a valid DateTime',
        })
        .optional(),
      endDate: z
        .string()
        .refine(val => !isNaN(Date.parse(val)), {
          message: 'End Date must be a valid DateTime',
        })
        .optional(),
    })
    .refine(
      data => {
        if (data.startDate && data.endDate) {
          const startDate = new Date(data.startDate)
          const endDate = new Date(data.endDate)
          return endDate > startDate
        }
        return true
      },
      {
        message: 'End Date must be after Start Date',
        path: ['endDate'],
      }
    ),
})
