const express = require("express")
const app = express()
const route = require('./src/routes/index')
const errorhandler = require('./src/middlewares/errorhandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', route)
app.use(errorhandler)

module.exports = app