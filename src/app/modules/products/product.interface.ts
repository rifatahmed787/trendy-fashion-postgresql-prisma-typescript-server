export type IClothFilter = {
  productName?: string
  productCategory?: string
  productGender?: string
  age?: string[]
  searchTerm?: string
}

export type IClothFilteringItems = {
  all_age: (string | null)[]
  all_category: (string | null)[]
}
