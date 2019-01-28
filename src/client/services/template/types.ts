export type TemplateMeta = {
  app_name: string
  app_logo: string
}

export type ProductListElement = {
  type: 'ProductList'
  content: string[]
}

export type MarkdownElement = {
  type: 'Markdown'
  content: string
}

export type TemplatePageContent = ProductListElement | MarkdownElement

export type TemplatePage = {
  href: string
  label: string
  content: TemplatePageContent[]
}

export type TemplateVariables = {
  color_canvas_ground: string
  color_canvas_first: string
  color_canvas_second: string
  color_canvas_third: string

  color_nav_bar_item: string
  color_nav_bar_item_active: string

  color_text_default: string
  color_text_highlight: string
  color_text_semi: string

  color_action_default: string
  color_action_primary: string
  color_action_secondary: string
  color_action_label: string

  color_success: string
  color_danger: string
}

export type Template = {
  id: string
  meta: TemplateMeta
  pages: TemplatePage[]
  variables: TemplateVariables
}
