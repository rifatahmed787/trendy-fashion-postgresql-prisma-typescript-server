import { z } from 'zod'

export const create_product_zod_schema = z.object({
  body: z.object({
    productName: z.string({ required_error: 'Name is required' }),
    productColor: z.array(z.string({ required_error: 'Color is required' })),
    productQuality: z.string({ required_error: 'Quality is required' }),
    productSize: z.array(z.string({ required_error: 'Size is required' })),
    productRating: z.number({ required_error: 'Ratings is required' }),
    productPrice: z.number({ required_error: 'Price is Required' }),
    productDetails: z.string({
      required_error: 'Product Details is required',
    }),
    productImage: z.array(z.string({ required_error: 'Image is required' })),
    productCategory: z.string({ required_error: 'Category is required' }),
    productType: z.string({ required_error: 'Type is required' }),
    productGender: z.string({ required_error: 'Gender is required' }),
    age: z.array(z.string({ required_error: 'Age is required' })),
    productSpecification: z.array(
      z.string({ required_error: 'Specification is required' })
    ),
    relatedProducts: z.array(
      z.string({ required_error: 'Related Product is required' })
    ),
  }),
})

export const update_product_zod_schema = z.object({
  body: z.object({
    productName: z.string({ required_error: 'Name is required' }).optional(),
    productColor: z.string({ required_error: 'Color is required' }).optional(),
    productQuality: z
      .string({ required_error: 'Quality is required' })
      .optional(),
    productSize: z
      .array(z.string({ required_error: 'Size is required' }))
      .optional(),
    productRating: z
      .number({ required_error: 'Ratings is required' })
      .optional(),
    productPrice: z.number({ required_error: 'Price is Required' }).optional(),
    productDetails: z
      .string({ required_error: 'Product Details is required' })
      .optional(),
    productImage: z
      .array(z.string({ required_error: 'Image is required' }))
      .optional(),
    productCategory: z
      .string({ required_error: 'Category is required' })
      .optional(),
    productGender: z
      .string({ required_error: 'Gender is required' })
      .optional(),
    age: z.string({ required_error: 'Age is required' }).optional(),
    productType: z.string({ required_error: 'Type is required' }).optional(),
    productSpecification: z
      .array(z.string({ required_error: 'Specification is required' }))
      .optional(),
    relatedProducts: z.array(
      z.string({ required_error: 'Related Product is required' }).optional()
    ),
  }),
})
