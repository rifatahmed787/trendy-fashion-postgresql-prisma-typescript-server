export type IProductFilter = {
  productName?: string
  productCategory?: string
  productType?: string
  productGender?: string
  searchTerm?: string
}

export type IProductFilteringItems = {
  all_gender: (string | null)[]
  all_category: (string | null)[]
  all_type: (string | null)[]
}
