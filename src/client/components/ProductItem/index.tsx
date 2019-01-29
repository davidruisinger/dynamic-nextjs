import React, { FunctionComponent } from 'react'
import _get from 'lodash.get'
import styled from '../_utils/styledComponents'
import AspectRatio from '../AspectRatio'
import Image from '../Image'
import ProductPrice from '../ProductPrice'
import { Product } from '../../services/product/types'

interface Props {
  product: Product
}

const Wrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.color_canvas_first};
  padding: 0.5em;
  box-sizing: border-box;
`

const ProductItem: FunctionComponent<Props> = ({ product }) => (
  <Wrapper>
    <AspectRatio ratio={0.75}>
      <Image width="100%" height="100%" src={product.images[0].url} />
    </AspectRatio>
    <h3>{product.name_en}</h3>
    <h4>
      <ProductPrice product={product} />
    </h4>
  </Wrapper>
)

export default ProductItem
