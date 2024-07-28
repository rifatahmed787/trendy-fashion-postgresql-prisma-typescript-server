import { product_search_condition_keys } from './product.constant'
import { IProductFilter } from './product.interface'

export const filter_product_conditions = (
  filters: IProductFilter
): { [key: string]: unknown } | undefined => {
  const { searchTerm, tags, ...filter_keys } = filters

  const conditions: Array<{ [key: string]: unknown }> = []

  if (searchTerm) {
    conditions.push({
      OR: [
        ...product_search_condition_keys.map(item => ({
          [item]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
        {
          productCategory: {
            categoryName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          productType: {
            typeName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          tags: {
            has: searchTerm,
          },
        },
      ],
    })
  }

  if (Object.keys(filter_keys).length) {
    conditions.push({
      AND: Object.entries(filter_keys).map(([key, value]) => {
        if (key === 'productName' && typeof value === 'string') {
          return { productName: { startsWith: value } }
        } else if (key === 'categoryName' && typeof value === 'string') {
          return {
            productCategory: {
              categoryName: { contains: value, mode: 'insensitive' },
            },
          }
        } else if (key === 'typeName' && typeof value === 'string') {
          return { productType: { typeName: { contains: value } } }
        } else if (key === 'productGender' && typeof value === 'string') {
          return { productGender: { contains: value } }
        } else if (key === 'productPrice') {
          return { productPrice: Number(value) }
        } else if (key === 'tags' && Array.isArray(value)) {
          return { tags: { hasSome: value } }
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  if (tags && Array.isArray(tags) && tags.length) {
    conditions.push({
      tags: {
        hasSome: tags,
      },
    })
  }

  return conditions.length > 0 ? { AND: conditions } : undefined
}
