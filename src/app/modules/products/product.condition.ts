import { IProductFilter } from './product.interface'

export const filter_product_conditions = (
  filters: IProductFilter
): { [key: string]: unknown } | undefined => {
  const { ...filter_keys } = filters

  console.log(filter_keys?.maxPrice, filter_keys.minPrice)

  const conditions: Array<{ [key: string]: unknown }> = []

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
        } else if (key === 'minPrice' || key === 'maxPrice') {
          const priceConditions: { [key: string]: unknown } = {}
          if (filter_keys.minPrice) {
            priceConditions.gte = Number(filter_keys.minPrice)
          }
          if (filter_keys.maxPrice) {
            priceConditions.lte = Number(filter_keys.maxPrice)
          }
          return { productPrice: priceConditions }
        } else if (key === 'tags' && Array.isArray(value)) {
          return { tags: { hasSome: value } }
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  return conditions.length > 0 ? { AND: conditions } : undefined
}
