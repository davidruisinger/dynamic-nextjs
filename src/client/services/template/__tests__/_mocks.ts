import { Template } from '../types'
import { TemplateState } from '../reducer'

export const templateMock: Template = {
  id: '1a2b3c',
  meta: {
    app_name: 'Test app',
    app_logo: '/static/img/logo_dark.png',
  },
  pages: [
    {
      href: '/test',
      label: 'test',
      content: [
        {
          type: 'Markdown',
          content: 'test',
        },
      ],
    },
  ],
  variables: {
    color_canvas_ground: '#ffffff',
    color_canvas_first: '#efefef',
    color_canvas_second: '#f1ebe3',
    color_canvas_third: '#dab9a5',

    color_nav_bar_item: '#ffffff',
    color_nav_bar_item_active: '#2f464f',

    color_text_default: '#2f464f',
    color_text_highlight: '#d8833d',
    color_text_semi: '#9b9b9b',

    color_action_default: '#9b9b9b',
    color_action_primary: '#4a90e2',
    color_action_secondary: '#ff9840',
    color_action_label: '#ffffff',

    color_success: '#009933',
    color_danger: '#cc0000',
  },
}

export const templateStateMock: TemplateState = {
  isFetching: false,
  error: null,
  template: templateMock,
}
