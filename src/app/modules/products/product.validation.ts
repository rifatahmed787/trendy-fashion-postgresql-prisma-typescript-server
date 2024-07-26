import { z } from 'zod'

export const createProductSchema = z.object({
  body: z.object({
    productId: z.string().min(1, { message: 'Product ID is required' }),
    productName: z.string().min(1, { message: 'Product Name is required' }),
    brandName: z.string().min(1, { message: 'Brand Name is required' }),
    productDetails: z.string().optional(),
    productColors: z.array(
      z.string().min(1, { message: 'Product colors is required' })
    ),
    productQualities: z.array(
      z.string().min(1, { message: 'Product Quality is required' })
    ),
    productImages: z.array(
      z.string().url({ message: 'Product Image must be a valid URL' })
    ),
    productSizes: z.array(
      z.string().min(1, { message: 'Product size is required' })
    ),
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
    tags: z.array(z.string().min(1, { message: 'Tag is required' })),
    category_id: z.number().int({ message: 'Category ID must be an integer' }),
    type_id: z.number().int({ message: 'Type ID must be an integer' }),
    newArrival: z.boolean(),
    stockOut: z.boolean().default(false),
    productQuantity: z
      .number()
      .int()
      .min(0, { message: 'Quantity must be zero or positive' }),
    bestSelling: z.boolean().default(false),
    productVerified: z.boolean().default(false),
    productGender: z.string().min(1, { message: 'Product Gender is required' }),
    ages: z.array(z.string().min(1, { message: 'Age is required' })),
  }),
})

export const updateProductSchema = z.object({
  body: z.object({
    productId: z.string().min(1).optional(),
    productName: z.string().min(1).optional(),
    brandName: z.string().min(1).optional(),
    productDetails: z.string().optional(),
    productColors: z.array(z.string().min(1)).optional(),
    productQualities: z.array(z.string().min(1)).optional(),
    productImages: z.array(z.string().url()).optional(),
    productSizes: z.array(z.string().min(1)).optional(),
    oldPrice: z.number().min(0).default(0.0).optional(),
    productPrice: z.number().min(0).optional(),
    productRating: z.number().min(0).max(5).optional(),
    productSpecifications: z.array(z.string().min(1)).optional(),
    tags: z.array(z.string().min(1)).optional(),
    category_id: z.number().int().optional(),
    type_id: z.number().int().optional(),
    newArrival: z.boolean(),
    stockOut: z.boolean().default(false),
    productQuantity: z.number().int().min(0).optional(),
    bestSelling: z.boolean().default(false).optional(),
    productVerified: z.boolean().default(false).optional(),
    productGender: z.string().min(1).optional(),
    ages: z.array(z.string().min(1)).optional(),
  }),
})
