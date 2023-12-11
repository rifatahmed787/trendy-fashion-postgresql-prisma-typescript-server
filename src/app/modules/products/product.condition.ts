import { cloth_search_condition_keys } from './product.constant'
import { IClothFilter } from './product.interface'

export const filter_cloth_conditions = (
  filters: IClothFilter
): { [key: string]: unknown } | undefined => {
  const { searchTerm, ...filter_keys } = filters

  const conditions = []

  if (searchTerm) {
    conditions.push({
      OR: cloth_search_condition_keys.map(item => ({
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
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  return conditions?.length > 0 ? { AND: conditions } : undefined
}
