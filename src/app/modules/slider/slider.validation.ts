import { z } from 'zod'

export const createSliderSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  des: z.string().min(1, { message: 'Description is required' }),
  img: z.string().url({ message: 'Image must be a valid URL' }),
})

export const updateSliderSchema = z.object({
  id: z.number().int().positive({ message: 'ID must be a positive integer' }),
  title: z.string().min(1, { message: 'Title is required' }).optional(),
  des: z.string().min(1, { message: 'Description is required' }).optional(),
  img: z.string().url({ message: 'Image must be a valid URL' }).optional(),
})
