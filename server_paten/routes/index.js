const app = require('../app')
const router = require('express').Router()
const shopRouter = require('./shopRouter')

router.get('/', (req, res) => {
  res.json({ welcome: 'hello world' })
})

router.use('/shops', shopRouter)

module.exports = router
