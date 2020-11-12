const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const owner = require('./route/owner')
const customer = require('./route/customer')
const err = require('./middleware/err')

app.use(cors())
app.use(express.urlencoded({ extended:true}))
app.use(express.json())

app.use('/owner', owner)
app.use('/customer', customer)
app.use(err)



module.exports = app