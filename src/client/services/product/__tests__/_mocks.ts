import { Product } from '../types'
import { ProductState } from '../reducer'

export const productsMock: Product[] = [
  {
    id: '1',
    shop: '1a2b3c',
    name_en: 'Dummy product',
    desc_en: 'Dummy description',
    images: [],
    price_eur_regular: 100,
    price_eur_discounted: 100,
    variations: [],
  },
]

export const productStateMock: ProductState = {
  isFetching: false,
  error: null,
  products: productsMock,
}
