import { z } from 'zod'

export const createSliderSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    des: z.string({ required_error: 'Des is required' }),
    img: z.string({ required_error: 'Image is required' }),
  }),
})

export const updateSliderSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    des: z.string().optional(),
    img: z.string().optional(),
  }),
})
