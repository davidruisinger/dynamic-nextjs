import React, { FunctionComponent } from 'react'
import styled from '../_utils/styledComponents'
import FlexBox from '../FlexBox'
import ProductItem from '../ProductItem'
import FlexItem from '../FlexItem'
import media from '../_utils/mediaTemplate'
import { Product } from '../../services/product/types'

interface Props {
  products: Product[]
}

const Wrapper = styled(FlexItem)`
  flex-basis: 100%;
  margin-right: 0;
  box-sizing: border-box;
  margin-bottom: 1em;

  ${media.md`
    flex-basis: 50%;
    :nth-child(odd) {
      padding-right: 0.5em;
    }
    :nth-child(even) {
      padding-left: 0.5em;
    }
  `};

  ${media.lg`
    flex-basis: 33.33%;
    :nth-child(odd) {
      padding-left: 0.5em;
    }
    :nth-child(even) {
      padding-right: 0.5em;
    }
  `};
`

const ProductList: FunctionComponent<Props> = ({ products }) => (
  <FlexBox direction="row" wrap="wrap">
    {products.map(product => (
      <Wrapper key={product.id}>
        <ProductItem product={product} />
      </Wrapper>
    ))}
  </FlexBox>
)

export default ProductList
