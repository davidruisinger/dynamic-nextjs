const path = require('path')
const express = require('express')
const next = require('next')

const isDev = process.env.NODE_ENV !== 'production'
const clientDir = path.resolve(__dirname, '../client')

const initApp = () =>
  new Promise((res, rej) => {
    const nextJS = next({ dev: isDev, dir: clientDir })
    const defaultHandler = nextJS.getRequestHandler()

    // Let's define our routes
    nextJS
      .prepare()
      .then(() => {
        const app = express()

        /**
         * The static directory is handled by the nextJS defaultHandler
         */
        app.get(['/static'], (req, res) => defaultHandler(req, res))

        /**
         * All other routes are directed to the _dynamic page file
         * which renders the content based on what is defined in the template.
         */
        app.get('/*', (req, res) =>
          nextJS.render(req, res, '/_dynamic', { originalUrl: req.originalUrl })
        )

        res(app)
      })
      .catch(e => rej(e))
  })

module.exports = initApp
