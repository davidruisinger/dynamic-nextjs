import React from 'react'
import {
  ElementParser,
  ParserFetchContext,
  ParserRenderContext,
} from 'PageTypes'
import { Markdown } from '../../../components'

export default class MarkdownParser implements ElementParser {
  static async fetchContent({ element }: ParserFetchContext) {
    // Return the element since it does not required any content to be fetched
    return element
  }

  static render = ({ key, element }: ParserRenderContext) =>
    React.createElement(Markdown, { key, content: element.content }, null)
}
