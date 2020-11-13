const app = require('../app')
const router = require('express').Router()
const productRouter = require('./productRouter')
const shopRouter = require('./shopRouter')

router.get('/', (req, res) => {
  res.json({ welcome: 'hello world' })
})

router.use('/products', productRouter)
router.use('/shops', shopRouter)

module.exports = router
