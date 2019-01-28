const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  distDir: '../../build', // Relative to the client dir
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    URL_CONFIG_BASE: process.env.URL_CONFIG_BASE,
    SHOP_ID: process.env.SHOP_ID,
  },
})
