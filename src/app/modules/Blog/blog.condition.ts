import { blog_search_condition_keys } from './blog.constant'
import { IBlogFilter } from './blog.interface'

export const filter_blog_conditions = (
  filters: IBlogFilter
): { [key: string]: unknown } | undefined => {
  const { searchTerm, ...filter_keys } = filters

  const conditions = []

  if (searchTerm) {
    conditions.push({
      OR: blog_search_condition_keys.map(item => ({
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
        if (key === 'title') {
          return { title: { startsWith: value } }
        } else {
          return { [key]: value }
        }
      }),
    })
  }

  return conditions?.length > 0 ? { AND: conditions } : undefined
}
