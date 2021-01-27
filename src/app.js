const express = require("express")
const app = express()
const route = require('./routes/index')
const errorhandler = require('./middlewares/errorhandler')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', route)
app.use(errorhandler)

module.exports = app