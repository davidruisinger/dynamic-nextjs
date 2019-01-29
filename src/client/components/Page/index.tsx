import React, { FunctionComponent } from 'react'
import Head from 'next/head'
import styled from '../_utils/styledComponents'
import Branding from '../Branding'
import Container from '../Container'
import FlexBox from '../FlexBox'
import FlexItem from '../FlexItem'
import Header from '../Header'
import Menu, { NavLink } from '../Menu'

interface Props {
  title?: string
  navLinks: NavLink[]
}

const Wrapper = styled.div`
  width: 100%;
`

const Page: FunctionComponent<Props> = ({ children, title, navLinks }) => (
  <Wrapper>
    <Head>
      <title>{title}</title>
    </Head>
    <Header>
      <FlexBox wrap="wrap" alignItems="center" justifyContent="center">
        <FlexItem grow={1}>
          <Branding link={navLinks[0] || { href: '/' }} />
        </FlexItem>
        <FlexItem>
          <Menu navLinks={navLinks} />
        </FlexItem>
      </FlexBox>
    </Header>
    <Container as="main">{children}</Container>
  </Wrapper>
)
Page.defaultProps = {
  title: '',
  navLinks: [],
}

export default Page
