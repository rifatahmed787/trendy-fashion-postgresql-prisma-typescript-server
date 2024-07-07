import { z } from 'zod'

// Schema for creating a ModalImg
export const createModalImgSchema = z
  .object({
    img: z.string().url({ message: 'Image must be a valid URL' }),
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
