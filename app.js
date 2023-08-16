const express = require('express')
const app = express()
require('dotenv').config()
const indexRouter = require('./routes/index')
const cors = require('cors')

const port = process.env.PORT || 3009
app.set('port', port)

// cross platform support
app.use(cors(
  origin = '*' // Only for testing purposes, if sent to production change to desired host
))

app.use(express.json())
app.use('/', indexRouter)

// Check for Invalid request // catch 404
app.use(function (req, res, next) {
  res.status(404).json({
    status: 404,
    success: false,
    message: 'Not Found',
    data: {}
  })
})

module.exports = app
