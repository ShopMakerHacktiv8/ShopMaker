const Owner = require('../controllers/owner')
const route = require('express').Router()

route.post('/register', Owner.register)
route.post('/login', Owner.login)

module.exports = route