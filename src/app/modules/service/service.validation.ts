import { z } from 'zod'

// Schema for creating a service
export const createServiceSchema = z.object({
  body: z.object({
    value: z.string().min(1, { message: 'Value is required' }),
    service: z.string().min(1, { message: 'Service is required' }),
    img: z.string({ required_error: 'Image is requred' }),
  }),
})

// Schema for updating a service
export const updateServiceSchema = z.object({
  body: z.object({
    value: z.string().optional(),
    service: z.string().optional(),
    img: z.string().optional(),
  }),
})
