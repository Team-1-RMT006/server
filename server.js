const http = require('http')
const app = require('./src/app')
const PORT = process.env.PORT || 3000
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`running on port: ${PORT}`)
})