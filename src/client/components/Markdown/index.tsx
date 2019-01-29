import React, { FunctionComponent } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from '../_utils/styledComponents'

interface Props {
  content: string
}

const Wrapper = styled.div`
  pre {
    border: 1px solid ${props => props.theme.color_canvas_second};
  }

  blockquote {
    color: ${props => props.theme.color_text_semi};
    margin: 0;
    padding-left: 3em;
    border-left: 0.5em ${props => props.theme.color_canvas_second} solid;
  }

  tr {
    border-top: 1px solid ${props => props.theme.color_canvas_second};
    background: ${props => props.theme.color_canvas_ground};
  }

  th,
  td {
    padding: 6px 13px;
    border: 1px solid ${props => props.theme.color_canvas_first};
  }

  table tr:nth-child(2n) {
    background: ${props => props.theme.color_canvas_second};
  }
`

const Markdown: FunctionComponent<Props> = ({ content }) => (
  <Wrapper>
    <ReactMarkdown source={content} />
  </Wrapper>
)

export default Markdown
