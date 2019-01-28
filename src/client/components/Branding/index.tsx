import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { withTheme } from 'styled-components'
import { ThemedComponent } from 'ComponentTypes'
import { NavLink } from '../Menu'
import Link from '../Link'
import Image from '../Image'
import media from '../_utils/mediaTemplate'

interface Props {
  link: NavLink
}

const Wrapper = styled.div<ThemedComponent>`
  height: 80px;
  ${media.md`
    height: 100px;
  `}

  h1 {
    font-weight: 500;
  }

  img {
    height: 100%;
    padding: 0.4em 0;
    box-sizing: border-box;
  }

  a {
    color: ${props => props.theme.color_nav_bar_item};
  }
`

const Branding: FunctionComponent<ThemedComponent & Props> = ({
  link,
  theme,
}) => (
  <Wrapper>
    <Link href={link.href} hrefAs={link.as}>
      {theme.appLogo ? (
        <Image width="auto" src={theme.appLogo} />
      ) : (
        <h1>{theme.appName}</h1>
      )}
    </Link>
  </Wrapper>
)

export default withTheme(Branding)
