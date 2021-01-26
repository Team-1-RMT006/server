const http = require('http')
const app = require('./src/app')
const PORT = 4000
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`running on port: ${PORT}`)
})