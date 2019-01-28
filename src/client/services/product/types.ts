export type Product = {
  id: string
  shop: string
  name_en: string
  desc_en: string
  images: ProductImage[]
  price_eur_regular: number
  price_eur_discounted: number
  variations: ProductVariation[]
}

export type ProductImage = {
  url: string
}

export type ProductVariation = {
  id: string
  name: string
}
