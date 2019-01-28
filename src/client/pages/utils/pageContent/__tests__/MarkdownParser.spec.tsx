import { markDownElementMock } from './_mocks'
import MarkDownParser from '../MarkdownParser'
import createMockStore from '../../../../store/utils/createMockStore'

const mockStore = createMockStore()

afterEach(mockStore.clearActions)
describe('MarkDownParser fetchContent', () => {
  it('should pass the element through without populating anything', async () => {
    const fetchedElement = await MarkDownParser.fetchContent({
      element: markDownElementMock,
      // @ts-ignore
      store: mockStore,
      isServer: true,
    })
    expect(mockStore.getActions()).toEqual([])
    expect(fetchedElement).toBe(markDownElementMock)
  })
})

describe('MarkDownParser render', () => {
  it('should return a MarkDown React component with props', () => {
    const element = MarkDownParser.render({
      key: 'elementKey',
      element: markDownElementMock,
    })
    expect(element.key).toEqual('elementKey')
  })
})
