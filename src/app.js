const express = require("express")
const app = express()
const route = require('./routes/index')
const errorhandler = require('./middlewares/errorhandler')
const cors = require("cors")
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', route)
app.use(errorhandler)

module.exports = app