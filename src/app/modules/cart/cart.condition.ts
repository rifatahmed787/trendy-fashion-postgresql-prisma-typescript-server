import { cart_search_condition_keys } from './cart.constant'
import { ICartFilter } from './cart.interface'

export const filter_cart_conditions = (
  filters: ICartFilter
): { [key: string]: unknown } | undefined => {
  const { searchTerm } = filters

  const conditions = []

  if (searchTerm) {
    conditions.push({
      OR: cart_search_condition_keys.map(item => ({
        [item]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    })
  }

  return conditions?.length > 0 ? { AND: conditions } : undefined
}
