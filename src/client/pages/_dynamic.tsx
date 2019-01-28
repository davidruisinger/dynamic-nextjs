import React from 'react'
import { PureComponent } from 'react'
import Error from 'next/error'
import { withRouter, WithRouterProps } from 'next/router'
import { connect } from 'react-redux'
import { PageContext } from 'PageTypes'
import { State } from 'ServicesTypes'
import {
  getPageContent,
  getPages,
  getAppName,
} from '../services/template/selectors'
import { TemplatePageContent, TemplatePage } from '../services/template/types'
import { fetchPageContent, renderPageContent } from './utils/pageContent'
import { Page } from '../components'

interface IProps {
  statusCode: number
  pageContent: TemplatePageContent[]
}

interface ReduxStateProps {
  appName: string
  pages: TemplatePage[]
}

class DynamicPage extends PureComponent<
  IProps & ReduxStateProps & WithRouterProps
> {
  static async getInitialProps({ query, req, res, store }: PageContext) {
    /**
     * Use the URL path to check the template for a potential page that is defined under that address.
     * If a page it is defined we'll fetch the content that is needed to render the elements on the page.
     */
    const isServer = !!req
    // Removes the query and potentially hashes to get a clean path
    const path: string = (query.originalUrl as string).split(/[?#]/)[0]
    const pageContent = getPageContent(store.getState(), { path })

    // If we do not have anything defined in the template
    if (!pageContent) {
      // Set the res code (server) and statusCode (client)
      if (res) res.statusCode = 404
      return {
        statusCode: 404,
        pageContent: undefined,
      }
    }

    const fetchedPageContent = await fetchPageContent({
      pageContent,
      store,
      isServer,
    })

    return {
      statusCode: 200,
      pageContent: fetchedPageContent,
    }
  }

  getNavLinks() {
    const { pages, router } = this.props
    return pages.map(page => ({
      href: `/_dynamic?originalUrl=${page.href}`,
      as: page.href,
      label: page.label,
      isActive: router.asPath == page.href,
    }))
  }

  getActiveNavLink() {
    return this.getNavLinks().find(link => link.isActive)
  }

  render() {
    const { appName, pageContent, statusCode } = this.props
    return !pageContent ? (
      <Error statusCode={statusCode} />
    ) : (
      <Page
        title={`${appName} - ${this.getActiveNavLink().label}`}
        navLinks={this.getNavLinks()}>
        {renderPageContent({ pageContent })}
      </Page>
    )
  }
}

const mapStateToProps = (state: State) => ({
  appName: getAppName(state),
  pages: getPages(state),
})

export default connect(mapStateToProps)(withRouter(DynamicPage))
