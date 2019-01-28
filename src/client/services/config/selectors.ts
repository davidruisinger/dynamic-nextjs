import { createSelector } from 'reselect'
import { SERVICE_NAME } from './constants'
import { State } from 'ServicesTypes'
// The react-native bundler will import the platform specific file (e.g. _configTags.ios.js)
import configTags from './_configTags'

const getConfigState = (state: State) => state[SERVICE_NAME]

export const getIsConfigFetching = createSelector(
  [getConfigState],
  configState => configState.isFetching
)

export const getConfigError = createSelector(
  [getConfigState],
  configState => configState.error
)

export const getShopId = createSelector(
  [getConfigState],
  configState => configState.shopId
)

export const getBaseUrl = createSelector(
  [getConfigState],
  configState => configState.baseUrl
)

export const getConfig = createSelector(
  [getConfigState],
  configState => configState.config
)

export const getUrlProductBase = createSelector(
  [getConfigState],
  configState => configState.config[configTags.url_product_base]
)

export const getUrlTemplateBase = createSelector(
  [getConfigState],
  configState => configState.config[configTags.url_template_base]
)
