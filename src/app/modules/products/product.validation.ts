import { z } from 'zod'

export const create_product_zod_schema = z.object({
  body: z.object({
    productName: z.string().min(1, { message: 'Product Name is required' }),
    productColor: z.array(
      z.string().min(1, { message: 'Product Color is required' })
    ),
    productQuality: z
      .string()
      .min(1, { message: 'Product Quality is required' }),
    productSize: z.array(
      z.string().min(1, { message: 'Product Size is required' })
    ),
    productRating: z.number().min(0, { message: 'Ratings is required' }),
    productPrice: z.number().min(0, { message: 'Price is required' }),
    productDetails: z
      .string()
      .min(1, { message: 'Product Details are required' }),
    productImage: z.array(
      z.string().url({ message: 'Product Image must be a valid URL' })
    ),
    productCategory: z
      .string()
      .min(1, { message: 'Product Category is required' }),
    productType: z.string().min(1, { message: 'Product Type is required' }),
    productGender: z.string().min(1, { message: 'Product Gender is required' }),
    age: z.array(z.string().min(1, { message: 'Age is required' })),
    productSpecification: z.array(
      z.string().min(1, { message: 'Product Specification is required' })
    ),
    relatedProducts: z.array(
      z.string().min(1, { message: 'Related Product is required' })
    ),
  }),
})

export const update_product_zod_schema = z.object({
  body: z.object({
    productName: z
      .string()
      .min(1, { message: 'Product Name is required' })
      .optional(),
    productColor: z
      .array(z.string().min(1, { message: 'Product Color is required' }))
      .optional(),
    productQuality: z
      .string()
      .min(1, { message: 'Product Quality is required' })
      .optional(),
    productSize: z
      .array(z.string().min(1, { message: 'Product Size is required' }))
      .optional(),
    productRating: z
      .number()
      .min(0, { message: 'Ratings is required' })
      .optional(),
    productPrice: z
      .number()
      .min(0, { message: 'Price is required' })
      .optional(),
    productDetails: z
      .string()
      .min(1, { message: 'Product Details are required' })
      .optional(),
    productImage: z
      .array(z.string().url({ message: 'Product Image must be a valid URL' }))
      .optional(),
    productCategory: z
      .string()
      .min(1, { message: 'Product Category is required' })
      .optional(),
    productType: z
      .string()
      .min(1, { message: 'Product Type is required' })
      .optional(),
    productGender: z
      .string()
      .min(1, { message: 'Product Gender is required' })
      .optional(),
    age: z.array(z.string().min(1, { message: 'Age is required' })).optional(),
    productSpecification: z
      .array(
        z.string().min(1, { message: 'Product Specification is required' })
      )
      .optional(),
    relatedProducts: z
      .array(z.string().min(1, { message: 'Related Product is required' }))
      .optional(),
  }),
})
