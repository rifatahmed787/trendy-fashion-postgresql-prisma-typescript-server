import { z } from 'zod'

// Schema for creating a service
export const createServiceSchema = z.object({
  value: z.string().min(1, { message: 'Value is required' }),
  service: z.string().min(1, { message: 'Service is required' }),
  paymentDetails: z
    .string()
    .min(1, { message: 'Payment details are required' }),
  shipmentDetails: z
    .string()
    .min(1, { message: 'Shipment details are required' }),
})

// Schema for updating a service
export const updateServiceSchema = z.object({
  value: z.string().min(1, { message: 'Value is required' }).optional(),
  service: z.string().min(1, { message: 'Service is required' }).optional(),
  paymentDetails: z
    .string()
    .min(1, { message: 'Payment details are required' })
    .optional(),
  shipmentDetails: z
    .string()
    .min(1, { message: 'Shipment details are required' })
    .optional(),
})
