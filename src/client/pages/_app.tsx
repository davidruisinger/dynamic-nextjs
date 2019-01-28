// The fetch API is not available on node so we use this library
import 'isomorphic-unfetch'
import React from 'react'
import App, {
  Container as AppContainer,
  NextAppContext,
  DefaultAppIProps,
} from 'next/app'
import getConfig from 'next/config'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { PageContext } from 'PageTypes'
import { Store } from 'StoreTypes'
import initializeStore from '../store'
import GlobalStyles from '../styles/globalStyles'
import { setBaseUrl, setShopId } from '../services/config/actions'
import { fetchTemplate } from '../services/template/actions'
import { TemplateVariables } from '../services/template/types'
import {
  getAppName,
  getAppLogo,
  getTemplateVariables,
} from '../services/template/selectors'

const { publicRuntimeConfig } = getConfig()

interface CustomAppContext extends NextAppContext {
  ctx: PageContext
}

interface CustomAppIProps extends DefaultAppIProps {
  appLogo: string
  appName: string
  store: Store
  templateVariables: TemplateVariables
}

interface IProps {
  appLogo: string
  appName: string
  pageProps: {} | Promise<{}>
  store: Store
  templateVariables: TemplateVariables
}

class CustomApp extends App<IProps> {
  static async getInitialProps(
    context: CustomAppContext
  ): Promise<CustomAppIProps> {
    const { Component, ctx } = context
    const { req, store } = ctx

    // Every server-side-request will include the configBase and a template
    if (!!req) {
      await store.awaitDispatch(true, dispatch => {
        dispatch(setBaseUrl({ baseUrl: publicRuntimeConfig.URL_CONFIG_BASE }))
        dispatch(setShopId({ shopId: publicRuntimeConfig.SHOP_ID }))
        dispatch(fetchTemplate())
      })
    }

    // Get the theme variables from store

    // Resolve the initial props of the actual Component
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return {
      appName: getAppName(store.getState()),
      appLogo: getAppLogo(store.getState()),
      pageProps,
      store,
      templateVariables: getTemplateVariables(store.getState()),
    }
  }

  render() {
    const {
      appName,
      appLogo,
      Component,
      pageProps,
      store,
      templateVariables,
    } = this.props

    return (
      <ThemeProvider theme={{ ...templateVariables, appName, appLogo }}>
        <AppContainer>
          <>
            <Normalize />
            <GlobalStyles />
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </>
        </AppContainer>
      </ThemeProvider>
    )
  }
}

export default withRedux(initializeStore)(CustomApp)
