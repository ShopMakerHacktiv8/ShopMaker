const Customer = require('../controllers/customer')
const route = require('express').Router()

route.post('/register', Customer.register)
route.post('/login', Customer.login)

module.exports = route