import { product_search_condition_keys } from './product.constant'
import { IProductFilter } from './product.interface'

export const filter_product_conditions = (
  filters: IProductFilter
): { [key: string]: unknown } | undefined => {
  const { searchTerm, ...filter_keys } = filters

  const conditions = []

  if (searchTerm) {
    conditions.push({
      OR: product_search_condition_keys.map(item => ({
        [item]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filter_keys).length) {
    conditions.push({
      AND: Object.entries(filter_keys).map(([key, value]) => {
        if (key === 'productName') {
          return { productName: { startsWith: value } }
        } else if (key === 'productCategory') {
          return { productCategory: { contains: value, mode: 'insensitive' } }
        } else if (key === 'productGender') {
          return { productGender: { contains: value, mode: 'insensitive' } }
        } else if (key === 'productPrice') {
          return { productPrice: { contains: value, mode: 'insensitive' } }
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  return conditions?.length > 0 ? { AND: conditions } : undefined
}
