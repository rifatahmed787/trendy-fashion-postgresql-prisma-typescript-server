/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloth_search_condition_keys } from './product.constant'
import { IClothFilter } from './product.interface'

export const filter_cloth_conditions = (
  filers: IClothFilter
): { [key: string]: Array<Record<string, any>> } | undefined => {
  const { searchTerm, ...filter_keys } = filers

  const conditions = []

  if (searchTerm) {
    conditions.push({
      $or: cloth_search_condition_keys.map(item => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  //
  if (Object.keys(filter_keys).length) {
    conditions.push({
      $and: Object.entries(filter_keys).map(([key, value]) => {
        if (key === 'productName') {
          return { productName: { $regex: '^' + value } }
        } else if (key === 'productCategory') {
          return { productCategory: new RegExp(`\\b${value}\\b`, 'i') }
        } else if (key === 'productGender') {
          return { productGender: new RegExp(`\\b${value}\\b`, 'i') }
        } else if (key === 'age') {
          return { age: new RegExp(`\\b${value}\\b`, 'i') }
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  return conditions?.length > 0 ? { $and: conditions } : undefined
}
