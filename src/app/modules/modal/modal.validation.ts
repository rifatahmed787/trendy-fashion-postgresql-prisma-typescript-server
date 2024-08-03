import { z } from 'zod'

// Schema for creating a ModalImg
export const createModalImgSchema = z.object({
  body: z
    .object({
      img: z.string().url({ message: 'Image must be a valid URL' }),
      percent: z.number({ required_error: 'Percentage is required' }),
      category_id: z.number({ required_error: 'Category id must be given' }),
      startTime: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'Start Date must be a valid DateTime',
      }),
      endTime: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: 'End Date must be a valid DateTime',
      }),
    })
    .refine(
      data => {
        const startTime = new Date(data.startTime)
        const endTime = new Date(data.endTime)
        return endTime > startTime
      },
      {
        message: 'End Date must be after Start Date',
        path: ['endDate'],
      }
    ),
})

// Schema for updating a ModalImg
export const updateModalImgSchema = z.object({
  body: z
    .object({
      img: z.string().url({ message: 'Image must be a valid URL' }).optional(),
      percent: z.number().optional(),
      category_id: z.number().optional(),
      startTime: z
        .string()
        .refine(val => !isNaN(Date.parse(val)), {
          message: 'Start Date must be a valid DateTime',
        })
        .optional(),
      endTime: z
        .string()
        .refine(val => !isNaN(Date.parse(val)), {
          message: 'End Date must be a valid DateTime',
        })
        .optional(),
    })
    .refine(
      data => {
        if (data.startTime && data.endTime) {
          const startTime = new Date(data.startTime)
          const endTime = new Date(data.endTime)
          return endTime > startTime
        }
        return true
      },
      {
        message: 'End Date must be after Start Date',
        path: ['endDate'],
      }
    ),
})
