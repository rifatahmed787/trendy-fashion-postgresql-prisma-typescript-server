export type IClothFilter = {
  productName?: string
  productCategory?: string
  productGender?: string
  searchTerm?: string
}

export type IClothFilteringItems = {
  all_gender: (string | null)[]
  all_category: (string | null)[]
}
