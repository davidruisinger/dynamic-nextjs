import React, { FunctionComponent } from 'react'
import styled from '../_utils/styledComponents'
import { Product } from '../../services/product/types'

interface Props {
  product: Product
}

const toCurrencyString = (price: number) => `€ ${price / 100}`

const OriginalPrice = styled.span`
  color: ${props => props.theme.color_text_semi};
  text-decoration: line-through ${props => props.theme.color_text_default};
`

const SellingPrice = styled.span`
  margin: 10px;
  color: ${props => props.theme.color_text_highlight};
`

const ProductPrice: FunctionComponent<Props> = ({ product }) => {
  const discountedPrice = product.price_eur_discounted
  const regularPrice = product.price_eur_regular
  const sellingPrice = Math.min(regularPrice, discountedPrice)

  return (
    <span>
      {sellingPrice < regularPrice ? (
        <>
          <OriginalPrice>{toCurrencyString(regularPrice)}</OriginalPrice>{' '}
        </>
      ) : null}
      <SellingPrice>{toCurrencyString(sellingPrice)}</SellingPrice>
    </span>
  )
}

export default ProductPrice
