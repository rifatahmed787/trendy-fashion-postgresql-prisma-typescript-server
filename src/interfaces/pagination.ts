import { Prisma } from '@prisma/client'

export type IPagination = {
  page: number
  limit: number
  sortBy: string
  sortOrder: Prisma.SortOrder
}
