import 'jest-styled-components'
import React from 'react'
import testRenderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import Hr from './index'
import { templateMock } from '../../services/template/__tests__/_mocks'

const tree = testRenderer
  .create(
    <ThemeProvider theme={templateMock.variables}>
      <Hr />
    </ThemeProvider>
  )
  .toJSON()

describe('<Hr />', () => {
  it('works', () => {
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule('border', '0')
    expect(tree).toHaveStyleRule('height', '1px')
    expect(tree).toHaveStyleRule(
      'background-color',
      templateMock.variables.color_canvas_first
    )
  })
})
