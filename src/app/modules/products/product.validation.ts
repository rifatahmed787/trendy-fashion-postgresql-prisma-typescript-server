import { z } from 'zod'

export const createProductSchema = z.object({
  body: z.object({
    productId: z.string().min(1, { message: 'Product ID is required' }),
    productName: z.string().min(1, { message: 'Product Name is required' }),
    productDetails: z.string().optional(),
    productColors: z.array(
      z.string().min(1, { message: 'Product Color is required' })
    ),
    productQualities: z.array(
      z.string().min(1, { message: 'Product Quality is required' })
    ),
    productImages: z.array(
      z.string().url({ message: 'Product Image must be a valid URL' })
    ),
    productSizes: z.array(
      z.string().min(1, { message: 'Product Size is required' })
    ), // Assuming size is a string here, adjust as needed
    oldPrice: z
      .number()
      .min(0, { message: 'Old Price must be zero or positive' })
      .default(0.0),
    productPrice: z
      .number()
      .min(0, { message: 'Product Price must be zero or positive' }),
    productRating: z.number().min(0).max(5).optional(), // Assuming rating is between 0 and 5
    productSpecifications: z.array(
      z.string().min(1, { message: 'Product Specification is required' })
    ),
    category_id: z.number().int({ message: 'Category ID must be an integer' }),
    productType: z.string().min(1, { message: 'Product Type is required' }),
    productGender: z.string().min(1, { message: 'Product Gender is required' }),
    ages: z.array(z.string().min(1, { message: 'Age is required' })),
    quantity: z
      .number()
      .int()
      .min(0, { message: 'Quantity must be zero or positive' }),
    buyerId: z.number().int().optional(),
    createdAt: z
      .string()
      .refine(val => !isNaN(Date.parse(val)), {
        message: 'Creation date must be a valid DateTime',
      })
      .optional(),
  }),
})

export const updateProductSchema = z.object({
  body: z.object({
    productId: z
      .string()
      .min(1, { message: 'Product ID is required' })
      .optional(),
    productName: z
      .string()
      .min(1, { message: 'Product Name is required' })
      .optional(),
    productDetails: z.string().optional(),
    productColors: z
      .array(z.string().min(1, { message: 'Product Color is required' }))
      .optional(),
    productQualities: z
      .array(z.string().min(1, { message: 'Product Quality is required' }))
      .optional(),
    productImages: z
      .array(z.string().url({ message: 'Product Image must be a valid URL' }))
      .optional(),
    productSizes: z
      .array(z.string().min(1, { message: 'Product Size is required' }))
      .optional(),
    oldPrice: z
      .number()
      .min(0, { message: 'Old Price must be zero or positive' })
      .default(0.0)
      .optional(),
    productPrice: z
      .number()
      .min(0, { message: 'Product Price must be zero or positive' })
      .optional(),
    productRating: z.number().min(0).max(5).optional(), // Assuming rating is between 0 and 5
    productSpecifications: z
      .array(
        z.string().min(1, { message: 'Product Specification is required' })
      )
      .optional(),
    category_id: z
      .number()
      .int({ message: 'Category ID must be an integer' })
      .optional(),
    productType: z
      .string()
      .min(1, { message: 'Product Type is required' })
      .optional(),
    productGender: z
      .string()
      .min(1, { message: 'Product Gender is required' })
      .optional(),
    ages: z.array(z.string().min(1, { message: 'Age is required' })).optional(),
    quantity: z
      .number()
      .int()
      .min(0, { message: 'Quantity must be zero or positive' })
      .optional(),
    buyerId: z.number().int().optional(),
    createdAt: z
      .string()
      .refine(val => !isNaN(Date.parse(val)), {
        message: 'Creation date must be a valid DateTime',
      })
      .optional(),
  }),
})
