export type IProductFilter = {
  productName?: string
  categoryName?: string
  typeName?: string
  productGender?: string
  searchTerm?: string
  productPrice?: number
  tags?: string[]
}

export type IProductFilteringItems = {
  all_gender: (string | null)[]
  all_category: (string | null)[]
  all_type: (string | null)[]
}
