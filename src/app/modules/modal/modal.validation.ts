import { z } from 'zod'

// Schema for creating a ModalImg
export const createModalImgSchema = z
  .object({
    img: z.string().url({ message: 'Image must be a valid URL' }),
    percent: z.number({ required_error: 'Percentage is required' }),
    categoryName: z.string({ required_error: 'Category name must be given' }),
    startTime: z.date().optional(),
    endTime: z.date().optional(),
  })
  .refine(
    data => {
      if (data.startTime && data.endTime) {
        return data.endTime > data.startTime
      }
      return true
    },
    {
      message: 'End time must be after start time',
      path: ['endTime'],
    }
  )

// Schema for updating a ModalImg
export const updateModalImgSchema = z
  .object({
    img: z.string().url({ message: 'Image must be a valid URL' }).optional(),
    percent: z.number().optional(),
    categoryName: z.string().optional(),
    startTime: z.date().optional(),
    endTime: z.date().optional(),
  })
  .refine(
    data => {
      if (data.startTime && data.endTime) {
        return data.endTime > data.startTime
      }
      return true
    },
    {
      message: 'End time must be after start time',
      path: ['endTime'],
    }
  )
