const app = require('express')()
require('dotenv').config()
const cors = require('cors')
const user = require('./route/user')
const err = require('./middleware/err')

app.use(cors())
app.use(express.urlencoded({ extended:true}))
app.use(express.json())
app.use('/', user)
app.use(err)



module.exports = app