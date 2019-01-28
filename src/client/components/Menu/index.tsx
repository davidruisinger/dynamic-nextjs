import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import FlexBox from '../FlexBox'
import Link from '../Link'

export type NavLink = {
  href: string
  as?: string
  label?: string
  isActive?: boolean
}

interface MenuProps {
  navLinks: NavLink[]
}

const Wrapper = styled(FlexBox)`
  a {
    font-weight: 500;
    color: ${props => props.theme.color_nav_bar_item};
    padding: 0 1em;
    :last-child {
      padding-right: 0;
    }
  }

  a.active {
    color: ${props => props.theme.color_nav_bar_item_active};
    text-decoration: underline;
  }
`

const Menu: FunctionComponent<MenuProps> = ({ navLinks }) => (
  <Wrapper
    as="nav"
    direction="row"
    justifyContent="flex-end"
    alignItems="center">
    {navLinks.map(link => (
      <Link
        key={link.href}
        className={link.isActive ? 'active' : ''}
        href={link.href}
        hrefAs={link.as}>
        {link.label}
      </Link>
    ))}
  </Wrapper>
)

export default Menu
