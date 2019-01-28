const http = require('http')
const initApp = require('./app')

/**
 * Simply starts a nodeJS http server to serve our Express.js app
 */
const startServer = async () => {
  try {
    // Initialize our Express app...
    const app = await initApp()
    // ... and launch the http server with it
    const server = http.createServer(app)
    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  } catch (e) {
    process.exit(1)
  }
}

startServer()
