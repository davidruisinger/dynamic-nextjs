import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'
import { ThemedComponent } from 'ComponentTypes'

interface Props {
  href: string
  hrefAs?: string
  className?: string
}

const A = styled.a<ThemedComponent>`
  position: relative;
  cursor: pointer;
  color: ${props => props.theme.color_action_primary};

  /* Adds a hover effect for devices that support hovering */

  @media (hover: hover) {
    transition: opacity 0.3s ease-out;

    :hover {
      opacity: 0.75;
    }

    > * {
      transition: opacity 0.3s ease-out;
    }

    > *:hover {
      opacity: 0.75;
    }
  }
`

const Link: FunctionComponent<Props> = ({
  children,
  hrefAs,
  className,
  ...props
}) => (
  <NextLink passHref prefetch as={hrefAs} {...props}>
    <A className={className}>{children}</A>
  </NextLink>
)

export default Link
